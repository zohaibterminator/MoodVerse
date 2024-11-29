import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const dancing_script = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
});

function LandingPage() {
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-purple-100 flex flex-col items-center px-5">
      <div className="flex w-full max-w-[1190px] flex-col items-stretch mt-16 mb-40 max-md:max-w-full max-md:my-10">
        <div className="flex w-full items-stretch justify-between gap-5 pr-9 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
          <div
            className={cn(
              "justify-center text-purple-700 text-center text-4xl leading-8 tracking-tighter mt-2",
              dancing_script.className
            )}
          >
            MoodVerse
          </div>
          <div className="self-center flex items-stretch justify-between gap-5 my-auto max-md:justify-center">
            <div className="text-purple-700 text-center text-2xl leading-8 tracking-tight">
              Home
            </div>
            <div className="text-purple-700 text-center text-2xl leading-8 tracking-tight">
              About Us
            </div>
            <div className="text-purple-700 text-center text-2xl leading-8 tracking-tight whitespace-nowrap">
              How It Works
            </div>
          </div>
        </div>
        <div className="flex flex-row">
        <div className="  items-stretch basis-3/4 mt-32 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[85%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-10">
                <div className="justify-center text-purple-700 text-4xl font-bold leading-8 tracking-tighter max-md:max-w-full">
                  <span className="font-bold">
                    Welcome to MoodVerse <br />
                  </span>
                  <br />
                  <span className="space-y-3 font-semibold">
                    Unlock the Power of Emotion with MoodVerse - Your Personal
                    Emotional Journaling Platform!
                  </span>
                </div>
                <div className="justify-center text-purple-700 text-2xl font-medium leading-10 tracking-tight mt-8 max-md:max-w-full">
                  MoodVerse is more than just a journal; it&apos;s your companion on
                  the journey to understanding and embracing your emotions.
                  Whether you&apos;re capturing the highs of joy or navigating the
                  depths of introspection, MoodVerse empowers you to express,
                  reflect, and connect with your inner self.
                </div>
                <div className="flex items-stretch justify-between gap-3.5 mt-14 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                  <div className="flex grow basis-[0%] flex-col items-stretch">
                    <div>
                      <Link href="/sign-in">
                        <div className="justify-center text-white text-center text-3xl font-semibold leading-10 tracking-tight bg-purple-700 items-center px-5 py-8 rounded-[100px]">
                          LOG IN
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="flex grow basis-[0%] flex-col items-stretch">
                    <div>
                      <Link href="/sign-up">
                        <div className="justify-center text-purple-700 text-center text-3xl font-semibold leading-10 tracking-tight bg-purple-700 bg-opacity-0 items-center px-5 py-8 rounded-[100px] border-4 border-solid border-purple-700">
                          SIGN UP
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-28 items-stretch items-center justify-center content-center max-md:w-full max-md:ml-0">
              
              <Image
                loading="lazy"
                src="https://moodverse.blob.core.windows.net/moodverse-data/landing3.webp?sp=r&st=2024-11-29T14:52:08Z&se=2024-11-30T13:52:08Z&sv=2022-11-02&sr=b&sig=b9FdBAXmYxjsjxUu8s34wIvR6UJhwYLzsGP7Zt9Nzhg%3D"
                alt="Image Description"
                className="aspect-[1.06] object-contain object-center  overflow-hidden mt-10 max-md:mt-10"
                width={400}
                height={400}
              />
            </div>
            </div>
      </div>
    </div>
  );
}

export default LandingPage;