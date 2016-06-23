class App extends React.Component {
    constructor() {
        super();
        this.state = {
            hidden: true
        };
    }

    // write componentUpdates
    componentDidMount() {
        console.log('componentDidMount()');

        /**
         * Get countries from .json file.
         */
        fetch("countries.json")
            .then(r => r.json())
            .then(countries => this.setState({allCountries: countries}));


        /**
         * Create array from all .country class paths.
         *
         * @type {Array}
         */
        let countries = Array.from(document.querySelectorAll('.country'));

        /**
         * Add onClick event listener for every country,
         * get country code from (HTML) id.
         */

        countries.forEach(country => {
            country.addEventListener('click', e => {
                /**
                 * Get all clicked elements with 'active' class,
                 * remove class from previously clicked element.
                 *
                 * @type {NodeList}
                 */
                let activeElements = document.getElementsByClassName('active');
                if(activeElements.length >= 1) {
                    activeElements[0].classList.remove('active');
                }

                // console.log(country)
                console.log(countries[country.id]);

                // TODO: this.setState -> add currentCountry ?

                this.setState({
                    hidden: false,
                    countryCode: country.id,
                    location: country.id
                });
            })
        });
    }

    // componentWillUpdate() {
    //     console.log(this.state)
    //
    //     if(this.state.allCountries !== undefined) {
    //         console.log('State is not undefined')
    //     }
    //
    //     if(this.state !== undefined && location.hash == this.state.allCountries[this.state.countryCode]) {
    //
    //         console.log('Component will update')
    //         console.log(this.state)
    //     }
    // }

    /**
     * Set state to hide overlay div.
     */
    onClose() {
        let path = document.getElementById(this.state.countryCode);
        path.classList.remove('active');
        this.setState({hidden: true});
    }

    subPage() {
    //     // console.log(location.hash)
    //     let current = this.state.allCountries[this.state.countryCode];
    //
    //     // this.setState({location: current.name});
    //
    //     console.log(this.state);
    //
    //     if(this.state.location == current.name) {
    //         console.log('yey?!')
    //     }
    //
    //
    //     if(location.hash == current.name) {
    //         console.log('Das aktuelle Land ist Location')
    //     }

        /**
         * Save country id, so when switching the country it can be done by the id in JSON.
         */

        return(
            <div>
                <div className="button__prev">previous</div>
                <div className="button__next">next</div>
                <div className="country-detail">
                    <h1>{this.state.currentCountry.name}</h1>

                    <div>
                        {this.state.currentCountry.area}
                        {this.state.currentCountry.capital}
                        {this.state.currentCountry.inhabitants}
                    </div>
                </div>
            </div>
        )
    }

    // TODO: Write code so that when location.hash is set it changes the page.
    // Problem: long render time but looks smooth and can be created dynamically.

    render() {
        console.log('render');

        window.setTimeout(function() {
            document.getElementsByClassName('landing')[0].style.display = 'none';
        }, 3000);

        // console.log(location.hash);
        let path = document.getElementById(this.state.countryCode);

        /**
         * Open overlay div when country is clicked.
         */
        if(this.state.countryCode && !this.state.hidden) {
            // Set active class to clicked country
            path.classList.add('active');

            let currentCountry = this.state.allCountries[this.state.countryCode];
            console.log(currentCountry);
            if(location.hash == '#' + currentCountry.name) {
                // console.log('location is set')
            }

            /**
             * If country is visited render country info.
             * (Icon, name, quote, number of pics, 'more' link to country page, time.)
             */
            if(this.state.allCountries[this.state.countryCode].visited == 'true') {
                console.log('this state' + this.state);

                return (
                    <div id="overlay">
                        <div className="overlay__container small" id="close">
                            <a onClick={this.onClose.bind(this)}>
                                <svg className="svg" x="0px" y="0px" viewBox="0 0 512 512">
                                    <path className="icons"
                                          d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9s-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0s-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9s36.8,14.1,50.9,0L256,306.9  l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
                                </svg>
                                <span>close</span>
                            </a>
                        </div>

                        <div className="overlay__container" id="text">
                            <div className="country-icon">
                                <object data={"./media/icons/countries/" + currentCountry.name + ".svg"} type="image/svg+xml">
                                    {currentCountry.name} icon
                                </object>
                            </div>

                            <span className="country-name">{currentCountry.name}</span>
                            <div className="country-quote">
                                {currentCountry.quote}
                            </div>

                            <div className="test">
                                <span className="pics">
                                    {currentCountry.pictures} pictures
                                </span>
                            </div>

                        <span className="overlay__container small" id="more">

                            <div>

                            </div>
                            <a onClick={this.subPage.bind(this)}>
                                <svg className="svg" x="0px" y="0px" viewBox="0 0 512 512">
                                    <path className="icons"
                                          d="M383.6,322.7L278.6,423c-5.8,6-13.7,9-22.4,9s-16.5-3-22.4-9L128.4,322.7c-12.5-11.9-12.5-31.3,0-43.2  c12.5-11.9,32.7-11.9,45.2,0l50.4,48.2v-217c0-17,14.3-30.7,32-30.7s32,13.7,32,30.6v217l50.4-48.2c12.5-11.9,32.7-11.9,45.2,0  C396.1,291.4,396.1,310.7,383.6,322.7z"/>
                                </svg>
                                <span className="small">more</span>
                            </a>
                        </span>

                            {this.state.hidden ? <Country currentCountry={currentCountry} countryCode={this.state.countryCode} /> : null}

                        </div>

                        <div className="overlay__container" id="time">
                            <span id="a-p">ante</span> <span id="m">meridiem.</span>
                        </div>
                    </div>
                )
            } else {
                /**
                 * If country isn't visited render only 'haven't been' text.
                 */
                return (
                    <div id="overlay">
                        <div className="overlay__container small" id="close">
                            <a onClick={this.onClose.bind(this)}>
                                <svg className="svg" x="0px" y="0px" viewBox="0 0 512 512">
                                    <path className="icons"
                                          d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9s-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0s-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9s36.8,14.1,50.9,0L256,306.9  l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
                                </svg>
                                <span>close</span>
                            </a>
                        </div>

                        <div className="overlay__container" id="text">
                            <div className="plane">
                                <svg className="plane-svg" viewBox="0 0 512 460">
                                    <path className="icons plane" d="M339.6,430.8c-0.4-4.7-28.3-179.9-28.3-179.9c0-0.3,0-0.6,0-0.7c0.1-7.8,3.7-11,9.3-17.3c0,0,48.2-49.4,63.5-66.6
                                        c15.3-17.2,17.5-36.3,7.6-46.2l0,0l0,0c-9.9-9.9-28.9-7.7-46.1,7.6c-17.2,15.3-66.6,63.5-66.6,63.5c-6.2,5.7-9.4,9.3-17.3,9.3
                                        c-0.3,0-0.6,0-0.7,0c0,0-175.1-27.9-179.9-28.3c-4.8-0.4-12-1-19.4,6.4c-8.6,8.6-7.1,12.2-0.7,15.7c0,0,127.1,71.2,131.7,74
                                        c4.6,2.8,5.2,6,0.6,11.2c-4.6,5.2-32.2,33.4-35.4,36.7s-3.7,2.9-7.3,3.2l-51.5,6.2c-2.6,0.2-5.1,1.3-7.1,3.3c0,0-4.3,4.3-8.8,8.8
                                        c-4.5,4.5-3.2,7.1,2.3,9.3c5.5,2.1,35.4,10.7,35.4,10.7c0.7,0.3,4.6,1.9,5.9,3.2c3,3,5.7,5.6,1.8,10.6c-7.1,9-10.9,17.8-8.3,20.4
                                        l0,0l0,0c2.5,2.5,11.4-1.2,20.4-8.3c4.9-4,7.6-1.1,10.6,1.8c1.3,1.3,2.9,5.2,3.2,5.9c0,0,8.6,29.8,10.7,35.4
                                        c2.1,5.5,4.8,6.8,9.3,2.3c4.5-4.5,8.8-8.8,8.8-8.8c2-2,3.1-4.5,3.3-7.1l6.2-51.5c0.3-3.5,0-4.1,3.2-7.3c3.2-3.2,31.5-30.8,36.7-35.4
                                        c5.2-4.6,8.4-4,11.2,0.6c2.8,4.6,74,131.7,74,131.7c3.5,6.5,7.1,7.9,15.7-0.7C340.6,442.8,340.1,435.6,339.6,430.8z"/>
                                </svg>
                            </div>
                            <span className="country-name">{currentCountry.name}</span>
                            <div className="not-visited">
                                <div className="sorry">Sorry,</div> I haven't been here yet.
                            </div>
                        </div>

                        <div className="overlay__container" id="other-countries">
                            <span className="not-visited">but you can look for other countries:</span><br />
                            <span className="">
                                Canada<br />
                                Argentina

                                {this.state.allCountries[Math.random()]}<br/>
                                {this.state.allCountries[Math.random()]}
                                {this.state.allCountries[Math.random()]}
                            </span>

                        </div>
                    </div>
                )
            }
        } else return null;
    }
}
// TODO: get every path and set display none for all, except current.
// -> PROBLEM: Positionierung des Landes
class Country extends React.Component {
    enlarge() {
        // console.log(this);
        // console.log(country);
        let country = document.getElementById(this.props.countryCode);

    }

    render() {
        return (
            <div>
                <h1 onClick={this.enlarge()}>{this.props.currentCountry.name}</h1>

            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);
