-- DropForeignKey
ALTER TABLE "AI_Sentiment_Analysis" DROP CONSTRAINT "AI_Sentiment_Analysis_entry_id_fkey";

-- DropForeignKey
ALTER TABLE "AI_Sentiment_Analysis" DROP CONSTRAINT "AI_Sentiment_Analysis_mood_id_fkey";

-- AlterTable
ALTER TABLE "AI_Sentiment_Analysis" ALTER COLUMN "entry_id" DROP NOT NULL,
ALTER COLUMN "mood_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User_Profile" ALTER COLUMN "phone_num" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "AI_Sentiment_Analysis" ADD CONSTRAINT "AI_Sentiment_Analysis_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "Journal_Entries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AI_Sentiment_Analysis" ADD CONSTRAINT "AI_Sentiment_Analysis_mood_id_fkey" FOREIGN KEY ("mood_id") REFERENCES "Mood_Tracking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
