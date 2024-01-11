controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Inputpassword()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    GetPassword()
})
function Inputpassword () {
    InputPassword = game.askForNumber("InputPassword", 16)
    PasswordToSprite(InputPassword)
    // Call the Vigenere function, passing in the encryption key, the encrypted image, and "false" to indicate that you want the image to be decrypted.
    Vigenere(password, mySprite, false)
}
function Vigenere (passwordcolors: Sprite, imagemessage: Sprite, encode: boolean) {
    pIndex = 0
    for (let row = 0; row <= imagemessage.height - 1; row++) {
        for (let column = 0; column <= imagemessage.width - 1; column++) {
            if (encode) {
                imagemessage.image.setPixel(column, row, (imagemessage.image.getPixel(column, row) + passwordcolors.image.getPixel(pIndex, 0)) % 16)
            } else {
                imagemessage.image.setPixel(column, row, (imagemessage.image.getPixel(column, row) - passwordcolors.image.getPixel(pIndex, 0) + 16) % 16)
            }
            pIndex += 10
            if (pIndex >= passwordcolors.width) {
                pIndex = 0
            }
        }
        pause(1)
    }
}
function GetPassword () {
    Getpassword = game.askForNumber("SetPassword", 16)
    PasswordToSprite(Getpassword)
    // Call the Vigenere function, passing in the encryption key, the image to be encrypted, and "true" to indicate that you want the image encrypted.
    Vigenere(password, mySprite, true)
}
function PasswordToSprite (passwordnumber: number) {
    for (let index = 0; index <= 16; index++) {
        password.image.fillRect(index * 10, 0, 10, 10, (passwordnumber + index) % 16)
    }
}
let Getpassword = 0
let pIndex = 0
let InputPassword = 0
let password: Sprite = null
let mySprite: Sprite = null
// This is the image to encode or decode
mySprite = sprites.create(assets.image`Pizza`, SpriteKind.Player)
mySprite.y = 70
// This is the "cipher key" to encode and decode the image
password = sprites.create(assets.image`Color Key`, SpriteKind.Player)
password.top = 0
game.showLongText("Press 'A' to encrypt pixels to a new color and 'B' reverse that encryption.", DialogLayout.Center)
