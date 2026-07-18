import { auth } from "@clerk/nextjs"

const adminIds = [
  "user_3Gg27tJfSsbK88OADmWlNyj4Lhp",
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
