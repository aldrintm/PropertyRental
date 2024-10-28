import (Scheme, model, models) from 'mongoose'

const CustomerSchema = new Schema(
    {
        entered_by: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        contractor: {
            type: String,
            required: true
        },
        address: {
            street: String,
            city: String,
            state: String,
            zipcode: String,
            required: true
        },
        phone_1: {
            type: String,
            unique: [true, 'Phone already exist' ],
            required: [true, 'Phone is required' ]
        },
        phone_2: {
            type: String,
            unique: [true, 'Phone already exist' ],
            required: false
        },
        email_1: {
            type: String,
            unique: [true, 'Email already exist' ],
            required: [true, 'Email is required' ]
        },
        email_2: {
            type: String,
            unique: [true, 'Email already exist' ],
            required: false
        },
        status:[
            {
                type: String
            }
        ],
        order: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: false
        }

    },
    {
        timestamps: true,
      }
)