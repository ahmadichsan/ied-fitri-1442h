/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [isFireWorkDisplayed, setFireWorkDisplayed] = useState(false);

  useEffect(() => {

    // values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
    let i = 0;
    let a = 0;
    let isBackspacing = false
    let isParagraph = false;

    // Typerwrite text content. Use a pipe to indicate the start of the second line "|".
    const textArray = [
      "Pergi belanja buat beli buah [cakeep], Buah dibeli buat makan barengan|Alhamdulillah, Kite sampe di hari kemenangan",
      "Coba lagi ya...",
      "Nyak babe lagi duduk berdua, Liatin anak perjakanye yang masih bujangan|Yuk sama-sama doa, Semoga kite ketemu lagi sama Ramadhan tahun depan",
      "Terakhir nih terakhir....",
      "Ketupat sayur mantap aromanya, Mantap terasa saat dinikmatin|Akhir kata, Mohon maaf lahir dan batin",
    ];

    // Speed (in milliseconds) of typing.
    let speedForward = 40; //Typing Speed
    let speedWait = 2000; // Wait between typing and backspacing
    let speedBetweenLines = 1500; //Wait between first and second lines
    let speedBackspace = 10; //Backspace Speed

    //Run the loop
    typeWriter(textArray);

    function typeWriter(ar: string[]) {
      let eHeader = document.getElementById("header");
      let eParagraph = document.getElementById("par");

      if (!eHeader || !eParagraph) return;

      let aString = ar[a];

      // Determine if animation should be typing or backspacing
      if (!isBackspacing) {

        // If full string hasn't yet been typed out continue typing
        if (i < aString.length) {

          // If character about to be typed is a pipe, switch to second line and continue.
          if (aString.charAt(i) === "|") {
            isParagraph = true;
            eHeader.classList.remove("cursor");
            eParagraph.classList.add("cursor");
            i++;
            setTimeout(function () { typeWriter(ar); }, speedBetweenLines);

            // If character isn't a pipe, continue typing.
          } else {
            // Type header or subheader depending on whether pipe has been detected
            if (!isParagraph) {
              eHeader.textContent = eHeader.textContent + aString.charAt(i);
            } else {
              eParagraph.textContent = eParagraph.textContent + aString.charAt(i);
            }
            i++;
            setTimeout(function () { typeWriter(ar); }, speedForward);
          }

          // If full string has been typed, switch to backspace mode.
        } else if (i === aString.length) {
          isBackspacing = true;

          if (a === 4) {
            setFireWorkDisplayed(true);
            return;
          }

          setTimeout(function () { typeWriter(ar); }, speedWait);
        }

        // If backspacing is enabled
      } else {

        // If either the header or the paragraph still has text, continue backspacing
        if ((eHeader.textContent || '').length > 0 || (eParagraph.textContent || '').length > 0) {

          // If paragraph still has text, continue erasing, otherwise switch to the header.
          if ((eParagraph.textContent || '').length > 0) {
            eParagraph.textContent = (eParagraph.textContent || '').substring(0, (eParagraph.textContent || '').length - 1);
          } else if ((eHeader.textContent || '').length > 0) {
            eParagraph.classList.remove("cursor");
            eHeader.classList.add("cursor");

            eHeader.textContent = (eHeader.textContent || '').substring(0, (eHeader.textContent || '').length - 1);
          }
          setTimeout(function () { typeWriter(ar); }, speedBackspace);

          // If neither head or paragraph still has text, switch to next quote in array and start typing.
        } else {
          isBackspacing = false;
          i = 0;
          isParagraph = false;

          a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
          setTimeout(function () { typeWriter(ar); }, 50);
        }
      }
    }

    return () => {

    }
  }, []);

  return (
    <div className="container py-5">
      <div className="output" id="output">
        <h1 className="cursor" id="header" />
        <b><p id="par" /></b>
      </div>

      {isFireWorkDisplayed && (
        <>
          <div className="firework" id="firework1">
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
          </div>
          <div className="firework" id="firework2">
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
          </div>
          <div className="firework" id="firework3">
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
            <div className="explosion"></div>
          </div>

          <div className="wrap-img fade-in">
            <img src="ied.jpg" alt="ied" />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
