import React from "react";
import "../App.css";
import profileplaceholder from "../profileplaceholder.png";
import jonathoncoleman from "../jonathancoleman.jpg";
import davidwilliamson from "../davidwilliamson.jpg";

function AboutPage(){
        return (
            <div>
                 <p className="aboutTitle">Meet our Committee</p>
                  <div id="aboutContainer">
                     <div id="firstContainer">
                      <p className="committeeName">Jonathan Coleman OAM</p>
                      <img src={jonathoncoleman} width={"100%"} id="profileplaceholder"/>
                        <p classname="committeeText">Jonathon (Jono) Coleman became SMST’s founding patron in 2016, and vigorously promoted the theatre’s urgent reopening. Jono was a well-known radio and television host both in Australia and England for over forty years. He was renowned for his irrepressible sense of fun and the generosity to many causes which gained him an OAM.
                                                    Most memorably, Jono compèred Marian Street Theatre’s fiftieth birthday party in late 2016, organising the luscious birthday cake himself.
                                                    ‘As a long-time Lindfield resident,’ he told the crowd, ‘I spent many evenings at Marian Street Theatre. I even interviewed Ruth Cracknell there on stage for Simon Townsend’s Wonder World in the 1980s, and was so upset when it closed. Let’s get it opened pronto before we miss more opening nights.’
                                                    Sadly, Jono won’t be here to celebrate the theatre’s re-opening with us. He died in July 2021, far too young, and always wide-eyed as the child within him. We will remember you, Jono. Your effervescent enthusiasm for our theatre always raised our spirits high. Vale, and thank you.</p>
                     </div>

                     <div id="secondContainer">
                      <p className="committeeName">David Williamson AO</p>
                      <img src={davidwilliamson} width={"100%"} id="profileplaceholder"/>
                      <p classname="committeeText">David Williamson is recognised as Australia’s most successful playwright. Over 40 years, his work has ranged across theatre, film and television, seen in Australia, Britain, the United States, Canada, Europe and Asia. After his successful play The Coming of Stork premiered in 1970, others have included The Removalists, What If You Died Tomorrow?, The Department and Travelling North. In 2014 a record of eight of his plays were professionally produced in Sydney alone. His plays have won numerous Australian and overseas awards, including the coveted George Devine Award for The Removalists. Many of David Williamson’s stage works have also been adapted for the screen, including Don’s Party, The Club, Travelling North and Sanctuary. He has won the Australian Film Institute film script award five times, and twelve Australian Writers’ Guild AWGIE Awards. His screenplay for On the Beach was nominated for the US Golden Globe awards. Many of Williamson’s plays were performed at Marian Street Theatre in the 1990s, and he is delighted to be a patron of the movement to re-open the theatre.</p>
                     </div>
                        </div>

                 <div id="aboutContainer2">
                     <div id="firstContainer">
                      <p className="committeeName">Di Yerbury AO</p>
                      <img src={profileplaceholder} width={"100%"} id="profileplaceholder"/>
                        <p classname="committeeText">Professor Emerita Dianne Yerbury AO is an Australian academic and university administrator. She was the Vice-Chancellor of Macquarie University from 1987 to 2005 and Australia’s first female Vice-Chancellor. In 1987 she was also made Professor Emerita at the University of New South Wales. She was named the 2002 Telstra New South Wales Business Woman of the Year.</p>
                     </div>

                     <div id="secondContainer">
                      <p className="committeeName">Nadia Kostadinova</p>
                      <img src={profileplaceholder} width={"100%"} id="profileplaceholder"/>
                      <p classname="committeeText">Info to be added</p>
                     </div>
                  </div>
            </div>
        );
    }

export default AboutPage