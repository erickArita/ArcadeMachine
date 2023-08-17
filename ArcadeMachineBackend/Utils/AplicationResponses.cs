using Microsoft.AspNetCore.Mvc;

namespace ArcadeMachine.Utils;

public static class AplicationResponses
{
    public static ObjectResult Success(string message, object data = null)
    {
        return new ObjectResult(new { Status = "Success", Message = message, Data = data })
        {
            StatusCode = StatusCodes.Status200OK
        };
    }

    public static ObjectResult Success(object data = null)
    {
        return new ObjectResult(new { Status = "Success", Data = data })
        {
            StatusCode = StatusCodes.Status200OK
        };
    }


    public static ObjectResult Error(string message, object data = null)
    {
        return new BadRequestObjectResult(new ObjectResult(new { Status = "Error", Message = message, Data = data }))
        {
            StatusCode = StatusCodes.Status400BadRequest
        };
    }
}