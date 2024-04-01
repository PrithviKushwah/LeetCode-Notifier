import QuestionModel from '../Models/Question.js';
import User from '../Models/User.js';
import nodemailer from 'nodemailer';
import cron from 'node-cron';


const homeController = {
    all: async (req, res) => {
        try {
            const allQuestions = await QuestionModel.find();
            return res.status(200).json({ "all_questions": allQuestions });
        } catch (error) {
            console.error('Error fetching questions:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    add: async (req, res) => {
        try {
            const { question_number, question_name } = req.body;

            if (!question_number || !question_name) {
                return res.status(400).json({ error: 'Please enter question name and question number' });
            }

            const existingQuestion = await QuestionModel.findOne({ question_number });
            if (existingQuestion) {
                return res.status(400).json({ error: 'Question already Added for Notification' });
            }

            const newQuestion = new QuestionModel({
                question_number,
                question_name
            });

            await newQuestion.save();

           
            // Schedule the email to be sent 5 minutes later
            
            const intervalId = setInterval(async () => {
                // check thet question is available in db or not then send mail
                console.log(`Sending email`);
                await sendTestEmail();
                
             // Stop sending emails after 10 emails
                if (counter === 10) {
                    clearInterval(intervalId); // Stop the loop
                    console.log('All emails sent.');
                }
            }, 5 * 60 * 1000); // 5 minutes delay
// cron.schedule('*/5 * * * *', async () => {
//     console.log('Scheduling email...');
//     await  sendTestEmail();
// });
//             // Don't pass req, res to this function

            // Send success response
            res.status(201).json({ message: 'Question Added successfully' });
        } catch (error) {
            console.error('Error adding question:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    edit: async (req, res) => {
        console.log("edit");
    },

    delete: async (req, res) => {
        console.log("delete");
    }
};

// Function to send test email
async function sendTestEmail() {
    try {
        console.log("Sheduling Mail....");
        // Find a user (replace this with your actual logic)
        const user = await User.findOne(); // Example: Find the first user

        // If no user is found, log an error
        if (!user || !user.email) {
            console.error('No user found with an email address');
            return;
        }

        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'prithvikcmc20@svvv.edu.in',
                pass: 'Svvv@123'
            }
        });

        // Construct email message
        const mailOptions = {
            from: 'prithvikcmc20@svvv.edu.in',
            to: "kushwahprithvi78@gmail.com",
            subject: 'Test Email: Solve Your Question',
            text: `Dear User,\n\nThis is a test email for your question "Test Question" created at ${new Date()}.\n\nBest regards,\nYour App`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log('Test email sent successfully');
    } catch (error) {
        console.error('Error sending test email:', error);
    }
}

export default homeController;


