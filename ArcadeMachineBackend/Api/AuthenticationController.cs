using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ArcadeMachine.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace ArcadeMachine.Core.Autentication;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IConfiguration _configuration;

    public AuthenticationController(
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        IConfiguration configuration
    )
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    [HttpPost]
    [Route("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterUser registerUser)
    {
        // Check if the user exists
        var existUser = await _userManager.FindByEmailAsync(registerUser.Email);
        var existUserName = await _userManager.FindByNameAsync(registerUser.Username);
        if (existUser != null)
        {
            return AplicationResponses.Error("El email ya existe");
        }

        if (existUserName != null)
        {
            return AplicationResponses.Error("El nombre de usuario ya existe");
        }

        // Create the user
        var user = new IdentityUser
        {
            UserName = registerUser.Username,
            Email = registerUser.Email
        };

        var result = await _userManager.CreateAsync(user, registerUser.Password);

        if (!result.Succeeded)
        {
            return AplicationResponses.Error("Error al crear el usuario", result.Errors);
        }

        return await Login(new LoginUser
        {
            UserName = registerUser.Username,
            Password = registerUser.Password
        });
    }

    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login([FromBody] LoginUser loginUser)
    {
        var result = await _signInManager.PasswordSignInAsync(loginUser.UserName, loginUser.Password, false, false);

        if (result.Succeeded)
        {
            var user = (await _userManager.FindByNameAsync(loginUser.UserName));


            var authClaims = new List<Claim>()
            {
                new(ClaimTypes.Name, loginUser.UserName),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var jwtToken = GetToken(authClaims);

            return AplicationResponses.Success(data: new
            {
                token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                expiration = jwtToken.ValidTo.Millisecond,
            });
        }
        else
        {
            return AplicationResponses.Error("Error al iniciar sesión");
        }
    }

    private JwtSecurityToken GetToken(List<Claim> claims)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );
        return token;
    }

    [Authorize]
    [HttpGet]
    public async Task<UserInfoResponse> GetUserInfo()
    {
        var username = User.Identity.Name;

        try
        {
            var user = await _userManager.FindByNameAsync(username);

            return new UserInfoResponse(
                Username: username,
                Email: user.Email,
                UserId: Guid.Parse(user.Id)
            );
        }
        catch (Exception e)
        {
            throw new Exception("Error al obtener la información del usuario");
        }
    }
}