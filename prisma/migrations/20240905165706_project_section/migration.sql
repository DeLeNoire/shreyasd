-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('Websites', 'AI', 'Quant', 'BlockChain', 'Collabs', 'Miscellaneous');

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ProjectCategory" NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Website" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "techs" JSONB NOT NULL,
    "liveLink" TEXT,
    "githubLink" TEXT,
    "projectId" INTEGER,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AI" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "techs" JSONB NOT NULL,
    "liveLink" TEXT,
    "githubLink" TEXT,
    "projectId" INTEGER,

    CONSTRAINT "AI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "techs" JSONB NOT NULL,
    "liveLink" TEXT,
    "githubLink" TEXT,
    "projectId" INTEGER,

    CONSTRAINT "Quant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockChain" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "techs" JSONB NOT NULL,
    "liveLink" TEXT,
    "githubLink" TEXT,
    "projectId" INTEGER,

    CONSTRAINT "BlockChain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collab" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "techs" JSONB NOT NULL,
    "liveLink" TEXT,
    "githubLink" TEXT,
    "projectId" INTEGER,

    CONSTRAINT "Collab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Miscellaneous" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "techs" JSONB NOT NULL,
    "liveLink" TEXT,
    "githubLink" TEXT,
    "projectId" INTEGER,

    CONSTRAINT "Miscellaneous_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hook" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "websiteId" INTEGER,
    "aiId" INTEGER,
    "quantId" INTEGER,
    "blockchainId" INTEGER,
    "collabId" INTEGER,
    "miscId" INTEGER,

    CONSTRAINT "Hook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AI" ADD CONSTRAINT "AI_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quant" ADD CONSTRAINT "Quant_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockChain" ADD CONSTRAINT "BlockChain_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collab" ADD CONSTRAINT "Collab_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Miscellaneous" ADD CONSTRAINT "Miscellaneous_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hook" ADD CONSTRAINT "Hook_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hook" ADD CONSTRAINT "Hook_aiId_fkey" FOREIGN KEY ("aiId") REFERENCES "AI"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hook" ADD CONSTRAINT "Hook_quantId_fkey" FOREIGN KEY ("quantId") REFERENCES "Quant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hook" ADD CONSTRAINT "Hook_blockchainId_fkey" FOREIGN KEY ("blockchainId") REFERENCES "BlockChain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hook" ADD CONSTRAINT "Hook_collabId_fkey" FOREIGN KEY ("collabId") REFERENCES "Collab"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hook" ADD CONSTRAINT "Hook_miscId_fkey" FOREIGN KEY ("miscId") REFERENCES "Miscellaneous"("id") ON DELETE SET NULL ON UPDATE CASCADE;
