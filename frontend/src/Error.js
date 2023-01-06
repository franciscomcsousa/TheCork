// Error messages and their corresponding status codes:

export const errorMessages = [
    {
        key: 200,
        message: "Success"
    },
    {
        key: 201,
        message: "Created Successfully"
    },
    {
        key: 202,
        message: "Accepted Successfully"
    },
    {
        key: 400,
        message: "Bad Request"
    },
    {
        key: 401,
        message: "Unauthorized"
    },
    {
        key: 404,
        message: "Not Found"
    },
    {
        key: 500,
        message: "Internal Server Error"
    },
    {
        key: 502,
        message: "Bad Gateway"
    },
    {
        key: 450,
        message: "User and/or Password is incorrect"
    },
    {
        key: 451,
        message: "User does not have enough funds"
    },
    {
        key: 452,
        message: "Card number is not valid"
    },
    {
        key: 453,
        message: "User does not exist"
    },
    {
        key: 454,
        message: "User already exists"
    },
    {
        key: 455,
        message: "Restaurant does not exist"
    },
    {
        key: 456,
        message: "Reservation does not exist"
    },
    {
        key: 457,
        message: "Insufficient funds"
    },
    {
        key: 458,
        message: "Card already redeemed"
    },
    {
        key: 459,
        message: "Insufficient points"
    },
    {
        key: 460,
        message: "Restaurant is not registered"
    }
]

export const getErrorMessage = ( key ) => {
    const error = errorMessages.find((error) => error.key === key)
    return error.message
}