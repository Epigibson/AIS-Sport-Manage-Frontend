// import logo from './../assets/ais-logo.png'
// import './../components/Splash/splashStyles.css'

import { Flex } from "antd";

export const LoginLayout = ({ children }) => {
  return (
    <Flex gap="middle" vertical>
      <section className="h-screen bg-loader">
        <div className="container h-full p-0 m-auto sm:p-0">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div
              className="w-[calc(100%-2rem)] max-w-2xl"
              style={{ maxHeight: "calc(100vh-1rem)" }}
            >
              <div className="block shadow-lg dark:bg-neutral-800 g-0 lg:flex divide-x lg:flex-wrap">
                <div className="bg-slate-100 sm:rounded-t md:rounded-l px-4 md:px-0 lg:flex-auto lg:w-6/12">
                  <div className="md:mx-6 md:px-12 md:py-8">
                    <div className="w-full text-center gap-3 sm:my-1 my-5  inline-flex justify-center content-center items-center sm:block">
                      {/*<img className=" w-5 sm:mx-auto mx-2  sm:w-16 "*/}
                      {/*     src={logo}*/}
                      {/*     alt="logo"/>*/}

                      <div className="text-lg  sm:text-4xl font-bold  ">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-600 to-rose-500">
                          Ticket Support
                        </span>
                      </div>
                    </div>
                    {/**/}

                    {children}
                  </div>
                </div>

                {/*<div*/}
                {/*    className="flex w-full bg-slate-800 items-center sm:rounded-b  lg:w-6/12 lg:flex-auto md:rounded-r"*/}
                {/*>*/}
                {/*    <div className="p-0 w-full h-full lg:w-50vw text-white  ">*/}
                {/*        <div style={{width:'100%', maxWidth:'46vw'}}*/}
                {/*            className={'block self-center absolute z-10 w-[100%]  md:container md:mx-auto mx-auto  py-2 text-center'}>*/}

                {/*            <h4 className="mb-6 mt-[3rem] text-xl font-semibold ">*/}
                {/*                Planes para ayudar a cada equipo*/}
                {/*            </h4>*/}
                {/*        </div>*/}
                {/*        <Carousel></Carousel>*/}
                {/*    </div>*/}
                {/*</div>*/}
              </div>
              {/*</div>*/}
            </div>
          </div>
        </div>
      </section>
    </Flex>
  );
};
