const mongoose = require("mongoose");

const emailSchema = mongoose.Schema(
    {
        subject: {
            type: String,
            required:true
        },
        content: {
            type: String,
            required: true
        },
        isRead: {
            type: String,
            required: true,
            default: "false"
        }
        
    },
    {
        timestamps: true
    }
);

const email = mongoose.model("email", emailSchema);

module.exports = email;