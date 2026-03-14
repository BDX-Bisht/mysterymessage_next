# Mystery Message

An anonymous messaging platform built with Next.js that allows users to send and receive messages without revealing their identity. Share your thoughts, compliments, or feedback freely!

## 🚀 Features

- **Anonymous Messaging**: Send messages without revealing your identity
- **User Authentication**: Secure sign-up and sign-in with email verification
- **AI-Powered Suggestions**: Get message suggestions using AI
- **Dashboard**: Manage your messages and settings
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Email Notifications**: Receive notifications via email

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Radix UI
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Email Service**: Resend
- **AI Integration**: Vercel AI SDK with Google AI
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+
- MongoDB database
- Resend account for email service
- Google AI API key (optional, for message suggestions with Vercel AI SDK)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mysterymessage_next
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000

   # Email Service
   RESEND_API_KEY=your_resend_api_key

   # AI (Optional - for message suggestions with Vercel AI SDK)
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (app)/             # Main app pages
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── context/               # React context providers
├── helpers/               # Utility functions
├── lib/                   # Library configurations
├── model/                 # Database models
├── schemas/               # Validation schemas
└── types/                 # TypeScript type definitions
```

## � Authentication

This project uses **NextAuth.js** for secure authentication with the following features:

- Email-based registration and login
- Email verification for account activation
- Session management with JWT tokens
- Secure cookie handling for production
- Integration with MongoDB for user storage

## 🤖 AI-Powered Features

The app leverages **Vercel AI SDK** with Google AI integration to provide:

- Smart message suggestions for users
- Context-aware content generation
- Enhanced user experience with AI assistance

## 🗄️ API Routes

- `POST /api/sign-up` - User registration
- `POST /api/verify-code` - Email verification
- `POST /api/send-message` - Send anonymous message
- `GET /api/get-messages` - Retrieve user messages
- `POST /api/accept-message` - Accept/reject messages
- `DELETE /api/delete-message/[messageId]` - Delete a message
- `GET /api/suggest-messages` - Get AI message suggestions
- `GET /api/check-username-unique` - Check username availability

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Project Overview**: Mystery Message is a full-stack web application that enables anonymous communication between users. Built with modern web technologies, it features secure authentication, AI-powered message suggestions, real-time messaging capabilities, and a responsive user interface. The platform allows users to create unique usernames, send and receive anonymous messages, and manage their communication preferences through an intuitive dashboard.

Built with ❤️ using Next.js
