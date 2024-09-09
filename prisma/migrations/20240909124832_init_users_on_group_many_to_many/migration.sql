-- CreateTable
CREATE TABLE "GroupPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserOnGroupPosts" (
    "userId" TEXT NOT NULL,
    "groupPostId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "groupPostId"),
    CONSTRAINT "UserOnGroupPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserOnGroupPosts_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "GroupPost" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
