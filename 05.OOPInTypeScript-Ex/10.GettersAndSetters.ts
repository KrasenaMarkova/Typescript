class User {
    // когато е private не можем да достъпваме username в други класове, 
    // но като добавим гетъри и сетъри(плюс някаква custom логика)
    //  ще можем чрез тях да го достъпваме
    private _username: string;

    constructor(username: string) {
        this._username = username; // uses the setter to validate
    }

    // Getter for username
    get username(): string {
        return this._username;
    }

    //Setter for username with validation 
    set username(newUsername: string) {
        if (newUsername.length < 3) {
            throw new Error("Username must be at least 3 characters long.");
        }
        this._username = newUsername;
    }
}

const user = new User("Martin");
user.username = "johnDoe";
console.log(user.username);



