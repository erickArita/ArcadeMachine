using Microsoft.Build.Framework;

namespace ArcadeMachine.Core.Autentication;

public class LoginUser
{
    [Required] public string UserName { get; set; }
    [Required] public string Password { get; set; }
}