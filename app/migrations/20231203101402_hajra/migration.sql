-- CreateTable
CREATE TABLE "User_Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "profession" TEXT,
    "gender" TEXT,
    "phone_num" INTEGER,

    CONSTRAINT "User_Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test" (
    "name" TEXT NOT NULL,

    CONSTRAINT "test_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Journal_Entries" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "journal_text" TEXT NOT NULL,

    CONSTRAINT "Journal_Entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood_Tracking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mood" TEXT NOT NULL,
    "Note" TEXT,
    "intensity" INTEGER NOT NULL,
    "location" TEXT,
    "weather" TEXT,

    CONSTRAINT "Mood_Tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AI_Sentiment_Analysis" (
    "id" TEXT NOT NULL,
    "entry_id" TEXT NOT NULL,
    "mood_id" TEXT NOT NULL,
    "analysis" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AI_Sentiment_Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL,
    "analysis_id" TEXT NOT NULL,
    "recommendations" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "recommendation_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Journal_Entries_userId_idx" ON "Journal_Entries"("userId");

-- CreateIndex
CREATE INDEX "Mood_Tracking_userId_idx" ON "Mood_Tracking"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AI_Sentiment_Analysis_entry_id_key" ON "AI_Sentiment_Analysis"("entry_id");

-- CreateIndex
CREATE UNIQUE INDEX "AI_Sentiment_Analysis_mood_id_key" ON "AI_Sentiment_Analysis"("mood_id");

-- CreateIndex
CREATE UNIQUE INDEX "Recommendation_analysis_id_key" ON "Recommendation"("analysis_id");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_recommendation_id_key" ON "Rating"("recommendation_id");

-- AddForeignKey
ALTER TABLE "Journal_Entries" ADD CONSTRAINT "Journal_Entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mood_Tracking" ADD CONSTRAINT "Mood_Tracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AI_Sentiment_Analysis" ADD CONSTRAINT "AI_Sentiment_Analysis_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "Journal_Entries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AI_Sentiment_Analysis" ADD CONSTRAINT "AI_Sentiment_Analysis_mood_id_fkey" FOREIGN KEY ("mood_id") REFERENCES "Mood_Tracking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_analysis_id_fkey" FOREIGN KEY ("analysis_id") REFERENCES "AI_Sentiment_Analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_recommendation_id_fkey" FOREIGN KEY ("recommendation_id") REFERENCES "Recommendation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
