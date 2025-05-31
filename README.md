# Use the same loaders


# Use the same colors
- Background: #000000 
- Text: #E0E0E0 (Light gray, easy on the eyes)
- Highlighted Text color : #9472FF
- Button color :  bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 


1. Problem with prisma initialization , prisma client was being initialized multiple times.
2. Made changes in package.json : "postinstall": "prisma generate" inside scripts
    - The Problem It Solves
      - Prisma Client is generated code, not installed code
      - Your node_modules/@prisma/client folder is created based on your schema.prisma
      - This folder is not committed to Git (it's in .gitignore)
      - Deployment servers need to regenerate it
3. changed the **NEXTAUTH_URL** && **NEXT_PUBLIC_BASE_URL** from localhost to deployed URL.
4. Google ko API key payeko dashboard ma gayera , Authorized URL changed from "localhost:3000" to deployed URL.


# The need to migrations
- Version Control & Tracking 
  -  we can know due to what previous changes made in the schema , led to the current structure of the schemas.
- Rollback Capability
  -  if we made some changes and it didn't work out , we can easily revert back

# What happens after I run "prisma migrate dev"
  - You change your Prisma schema.
  - You run the command "prisma migrate dev".
  - Prisma generates migration files containing SQL queries.
  - Prisma automatically runs those SQL queries against your database.
  - Now , Your database structure now matches your schema.