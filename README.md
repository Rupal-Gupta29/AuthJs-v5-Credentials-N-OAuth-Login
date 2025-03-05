This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This web application is built with Next.js 14 and uses Auth.js v5 for authentication. It incorporates server actions along with custom sign-up and sign-in pages for a seamless user experience.

For data management, the app utilizes MongoDB as the database, with Prisma ORM for efficient querying and data handling.

Authentication is handled using two approaches:

Credentials Provider: Users can manually register and log in using email and password.
OAuth Providers (Google, GitHub, etc.): Users can sign in via third-party providers, with accounts managed using the Prisma Adapter to ensure smooth integration.
Form validation is implemented using React Hook Form and Zod, ensuring robust client-side validation for user inputs.

### App Interface

![image](https://github.com/user-attachments/assets/7d6a6e3b-7539-4441-88ff-3ce327f5f898)

![image](https://github.com/user-attachments/assets/6cd6b78c-a1b0-4b45-9c5d-1dbe519d2e60)

with validations - 

![image](https://github.com/user-attachments/assets/1d0f2ba0-5afa-4d34-b733-eb72f5382e77)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Video Reference - https://www.youtube.com/watch?v=DNtsJlmPda8&t=1849s
