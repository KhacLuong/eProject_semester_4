import React from 'react';

const Header = () => {
    return (
        <header>
            <div>
                <section className={`mt-8 z-30`}>
                    <div className={`max-w-7xl flex mx-auto relative`}>
                        <div className={`md:w-full relative min-h-[1px] flex`}>
                            <div className={`relative w-full flex-wrap content-start`}>
                                <div className={`bg-primaryColor shadow-lg p-0`}>
                                    <div className={`max-w-7xl flex mx-auto relative`}>
                                        <div>
                                            BizTrip
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </header>
    );
};

export default Header;