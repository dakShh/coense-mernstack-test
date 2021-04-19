import mongoose from 'mongoose';
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : 'name required'
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true,'Email address is required'],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone : Number,
    city : String,
    State : String,
    Country : String,
    Area : String
});

const UserField = mongoose.model('UserField', userSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

export default UserField;