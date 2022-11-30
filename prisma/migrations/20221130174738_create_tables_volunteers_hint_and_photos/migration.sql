-- CreateTable
CREATE TABLE "Volunteer_hint" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Volunteer_hint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volunteer_hint_photo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Volunteer_hint_photo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Volunteer_hint" ADD CONSTRAINT "Volunteer_hint_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Volunteer_hint_photo" ADD CONSTRAINT "Volunteer_hint_photo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
