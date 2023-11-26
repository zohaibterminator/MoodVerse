import * as React from "react";

function Mood() {
  return (
    <div className="flex flex-col items-center px-5">
      <div className="flex w-full max-w-full flex-col items-stretch mt-20 mb-11 max-md:max-w-full max-md:my-10">
        <div className="max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[61%] max-md:w-full max-md:ml-0">
              <div className="grow mt-3 max-md:max-w-full max-md:mt-10">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-[26%] max-md:w-full max-md:ml-0">
                    <div className="flex flex-col items-stretch max-md:mt-8">
                      <div className="items-stretch flex justify-between gap-1">
                        <div className="text-stone-950 text-2xl font-medium leading-7">
                          <span className="">Hey,</span>
                          <span className="font-medium"> </span>
                          <span className="font-bold">Alexa!👋</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="justify-center items-stretch bg-white flex flex-col mt-7 pl-7 pr-11 py-3 rounded-[36px] max-md:px-5">
                    <div className="text-stone-950 text-sm leading-5 whitespace-nowrap">
                      Thu
                    </div>
                    <div className="text-stone-950 text-lg font-medium leading-5 whitespace-nowrap mt-1">
                      1
                    </div>
                  </div>
                  {/*<div className="justify-center bg-white bg-opacity-60 flex flex-col px-5 py-2 rounded-2xl">
                        <img
                          loading="lazy"
                          srcSet="..."
                          className="aspect-[4.45] object-contain object-center w-[89px] justify-center items-center shadow-sm overflow-hidden max-w-full max-md:ml-1"
                        />
  </div> */}

                  <div className="flex flex-col items-stretch w-[26%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="items-stretch flex flex-col mt-14 max-md:mt-10">
                      <div className="justify-center items-stretch bg-white flex flex-col pl-9 pr-6 py-3 rounded-[36px] max-md:px-5">
                        <div className="text-stone-950 text-sm leading-5 whitespace-nowrap">
                          Fri
                        </div>
                        <div className="text-stone-950 text-lg font-medium leading-5 whitespace-nowrap mt-1">
                          2
                        </div>
                      </div>
                      <div className="justify-center bg-white bg-opacity-60 flex aspect-[2.088235294117647] flex-col px-5 py-2 rounded-2xl">
                        <img
                          loading="lazy"
                          srcSet="..."
                          className="aspect-[1.6] object-contain object-center w-8 justify-center items-center shadow-sm overflow-hidden max-md:ml-1.5"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-[22%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="items-stretch flex flex-col mt-14 max-md:mt-10">
                      <div className="justify-center items-stretch bg-white flex flex-col pl-7 pr-5 py-3 rounded-[36px] max-md:pl-5">
                        <div className="text-stone-950 text-sm leading-5 whitespace-nowrap">
                          Sat
                        </div>
                        <div className="text-stone-950 text-lg font-medium leading-5 whitespace-nowrap mt-1">
                          3
                        </div>
                      </div>
                      <div className="justify-center bg-white bg-opacity-60 flex aspect-[2.088235294117647] flex-col px-5 py-2 rounded-2xl">
                        <img
                          loading="lazy"
                          srcSet="..."
                          className="aspect-[1.65] object-contain object-center w-[33px] justify-center items-center shadow-sm overflow-hidden max-md:ml-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-[26%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="flex grow flex-col items-stretch mt-14 max-md:mt-10">
                      <div className="justify-center items-stretch bg-violet-500 flex flex-col pl-16 pr-14 py-5 rounded-[36px] max-md:px-5">
                        <div className="text-white text-sm leading-5 whitespace-nowrap">
                          Sun
                        </div>
                        <div className="text-white text-lg font-medium leading-5 whitespace-nowrap mt-1">
                          4
                        </div>
                      </div>
                      <div className="justify-center items-center bg-violet-500 self-center flex w-[104px] max-w-full flex-col px-5 py-2.5 rounded-2xl">
                        <img
                          loading="lazy"
                          srcSet="..."
                          className="aspect-square object-contain object-center w-[22px] justify-center items-center shadow-sm overflow-hidden max-w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[39%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex flex-col max-md:max-w-full max-md:mt-10">
                <div className="items-stretch flex w-[159px] max-w-full pr-0 gap-2 mr-8 max-md:mr-2.5">
                  <div className="shadow-sm bg-white flex grow basis-[0%] flex-col px-3.5 py-2.5 rounded-3xl">
                    <div className="items-stretch flex gap-2">
                      <div className="text-stone-950 text-sm leading-5">
                        Sun, 4 Jun
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/28975d43-5bec-4524-b844-a19a5a12bb51?"
                        className="aspect-square object-contain object-center w-5 justify-center items-center overflow-hidden shrink-0 max-w-full"
                      />
                    </div>
                  </div>
                  <div className="text-black text-2xl leading-7 whitespace-nowrap justify-center bg-white z-[1] aspect-[0.9] px-4 py-2.5 rounded-3xl">
                    🔥
                  </div>
                </div>
                <div className="self-stretch flex items-stretch justify-between gap-5 mt-6 pr-px max-md:max-w-full max-md:flex-wrap max-md:justify-center">
                  <div className="justify-center items-stretch bg-white bg-opacity-50 flex grow basis-[0%] flex-col pl-8 pr-5 py-3 rounded-[36px] max-md:pl-5">
                    <div className="text-stone-950 text-sm leading-5 whitespace-nowrap">
                      Mon
                    </div>
                    <div className="text-stone-950 text-lg font-medium leading-5 whitespace-nowrap mt-1">
                      5
                    </div>
                  </div>
                  <div className="justify-center items-stretch bg-white bg-opacity-50 flex grow basis-[0%] flex-col pl-8 pr-6 py-3 rounded-[36px] max-md:px-5">
                    <div className="text-stone-950 text-sm leading-5 whitespace-nowrap">
                      Tue
                    </div>
                    <div className="text-stone-950 text-lg font-medium leading-5 whitespace-nowrap mt-1">
                      6
                    </div>
                  </div>
                  <div className="justify-center items-stretch bg-white bg-opacity-50 flex grow basis-[0%] flex-col pl-7 pr-5 py-3 rounded-[36px] max-md:pl-5">
                    <div className="text-stone-950 text-sm leading-5 whitespace-nowrap">
                      Wed
                    </div>
                    <div className="text-stone-950 text-lg font-medium leading-5 whitespace-nowrap mt-1">
                      7
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[51%] max-md:w-full max-md:ml-0">
              <div className="bg-violet-200 bg-opacity-80 flex grow flex-col items-stretch w-full mx-auto pl-6 pr-12 py-10 rounded-2xl max-md:max-w-full max-md:mt-5 max-md:px-5">
                <div className="text-stone-950 text-lg font-medium leading-6 whitespace-nowrap max-md:max-w-full">
                  Mood chart
                </div>
                <div className="flex items-stretch justify-between gap-5 ml-4 mt-16 pr-4 self-start max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mt-10">
                  <div className="flex grow basis-[0%] flex-col items-stretch">
                    <div className="bg-gray-100 flex flex-col items-stretch pt-7 rounded-xl">
                      <div className="bg-green-400 bg-opacity-60 flex flex-col pt-0.5 pb-12 px-1 rounded-xl">
                        <img
                          loading="lazy"
                          srcSet="..."
                          className="aspect-[1.05] object-contain object-center w-[42px] justify-center items-center shadow-sm overflow-hidden mb-40 max-md:mb-10"
                        />
                      </div>
                    </div>
                    <div className="text-stone-950 text-opacity-70 text-center text-xs leading-4 whitespace-nowrap mt-8">
                      10:08
                    </div>
                  </div>
                  <div className="flex grow basis-[0%] flex-col items-stretch">
                    <div className="bg-gray-100 flex flex-col items-stretch pt-12 rounded-xl">
                      <div className="bg-red-600 bg-opacity-60 flex aspect-[0.8] flex-col mt-60 pt-0.5 pb-3.5 px-1 rounded-xl max-md:mt-10">
                        <img
                          loading="lazy"
                          srcSet="..."
                          className="aspect-square object-contain object-center w-10 justify-center items-center shadow-sm overflow-hidden"
                        />
                      </div>
                    </div>
                    <div className="text-stone-950 text-opacity-70 text-center text-xs leading-4 whitespace-nowrap mt-8">
                      12:10
                    </div>
                  </div>
                  <div className="flex grow basis-[0%] flex-col items-stretch">
                    <div className="bg-gray-100 flex flex-col items-stretch pt-12 rounded-xl">
                      <div className="bg-blue-500 bg-opacity-60 flex flex-col mt-24 pt-0.5 pb-12 px-1 rounded-xl max-md:mt-10">
                        <img
                          loading="lazy"
                          srcSet="..."
                          className="aspect-[1.1] object-contain object-center w-11 justify-center items-center shadow-sm overflow-hidden mb-16 max-md:mb-10"
                        />
                      </div>
                    </div>
                    <div className="text-stone-950 text-opacity-70 text-center text-xs leading-4 whitespace-nowrap mt-8">
                      14:40
                    </div>
                  </div>
                  <div className="flex grow basis-[0%] flex-col items-stretch">
                    <div className="bg-gray-100 flex flex-col items-center pt-12 rounded-xl">
                      <img
                        loading="lazy"
                        srcSet="..."
                        className="aspect-[0.39] object-contain object-center w-[46px] overflow-hidden mt-44 max-md:mt-10"
                      />
                    </div>
                    <div className="text-stone-950 text-opacity-70 text-center text-xs leading-4 whitespace-nowrap mt-8">
                      18:30
                    </div>
                  </div>
                  <div className="flex grow basis-[0%] flex-col items-stretch">
                    <div className="bg-gray-100 flex flex-col items-stretch pt-12 rounded-xl">
                      <div className="bg-red-600 bg-opacity-60 flex aspect-[0.8545454545454545] flex-col mt-60 pt-0.5 pb-3.5 px-1 rounded-xl max-md:mt-10">
                        <img
                          loading="lazy"
                          srcSet="..."
                          className="aspect-[1.08] object-contain object-center w-[43px] justify-center items-center shadow-sm overflow-hidden"
                        />
                      </div>
                    </div>
                    <div className="text-stone-950 text-opacity-70 text-center text-xs leading-4 whitespace-nowrap mt-8">
                      20:10
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[49%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-violet-200 bg-opacity-80 flex grow flex-col items-stretch w-full mx-auto pl-6 pr-16 pt-10 pb-12 rounded-2xl max-md:max-w-full max-md:mt-4 max-md:px-5">
                <div className="text-stone-950 text-lg font-medium leading-6 whitespace-nowrap max-md:max-w-full">
                  Mood chart
                </div>
                <div className="text-black text-lg leading-6 mt-7 mb-24 max-md:max-w-full max-md:mb-10">
                  In today's reflection, let's dive into the intricacies of
                  John's emotional landscape. As we explore the events and
                  experiences that shaped his day, we gain valuable insights
                  into the tapestry of his emotions.John started the day with a
                  burst of energy and enthusiasm, feeling optimistic about the
                  tasks ahead. The successful completion of a challenging
                  project at work elevated his mood, marked by a sense of
                  accomplishment.However, as the morning progressed, a series of
                  unexpected challenges arose. A missed bus and a burnt coffee
                  left John feeling frustrated and slightly disheartened. These
                  small inconveniences acted as emotional speed bumps,
                  disrupting his initial positivity.
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="justify-center shadow-lg bg-violet-500 self-center flex aspect-[1.1833333333333333] flex-col mt-8 px-5 py-3.5 rounded-[30px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a9a80e3-e2f4-4b8d-836e-d5fc1d1a57a9?"
            className="aspect-[1.26] object-contain object-center w-[43px] justify-center items-center overflow-hidden"
          />
        </div>{" "}
        <div className="text-stone-950 text-opacity-50 text-center text-sm font-medium leading-4 self-center whitespace-nowrap mt-2.5">
          Add mood
        </div>
      </div>
    </div>
  );
}

export default Mood;
