export class User {
    public id: string;

    public licence: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;

    public gender: string;
    public birthDate: Date;
    public phone: string;
    public address: string;

    public emailCheck: boolean;
    public phoneCheck: boolean;
    public canCreate: boolean;
    public isAdmin: boolean;

    public lastCoDate: Date;

    private _json: any;

    public toJSON() {return this._json;}

    public constructor (user) {
        const {
            _id         = null,
            licence     = null,
            firstName   = null,
            lastName    = null,
            email       = null,
            password    = null,
            gender      = null,
            birthDate   = null,
            phone       = null,
            address     = null,
            emailCheck  = null,
            phoneCheck  = null,
            canCreate   = null,
            isAdmin     = null,
            lastCoDate  = null
        } = user;

        this._json      = user;

        this.id         = _id;
        this.licence    = licence;
        this.firstName  = firstName;
        this.lastName   = lastName;
        this.email      = email;
        this.password   = password;
        this.gender     = gender;
        this.birthDate  = birthDate;
        this.phone      = phone;
        this.address    = address;
        this.emailCheck = emailCheck;
        this.phoneCheck = phoneCheck;
        this.canCreate  = canCreate;
        this.isAdmin    = isAdmin;
        this.lastCoDate = lastCoDate;
    }

}