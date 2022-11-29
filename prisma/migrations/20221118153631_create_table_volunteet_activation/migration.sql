-- CreateTable
CREATE TABLE "Volunteer_activation_request" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" BOOLEAN,

    CONSTRAINT "Volunteer_activation_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer_activation_request_userId_key" ON "Volunteer_activation_request"("userId");

-- AddForeignKey
ALTER TABLE "Volunteer_activation_request" ADD CONSTRAINT "Volunteer_activation_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
