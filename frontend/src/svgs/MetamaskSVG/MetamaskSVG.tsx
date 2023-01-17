import "./MetamaskSVG.scss"

interface MetamaskSVGProps {
  talking: boolean,
  className: string
}

export const MetamaskSVG = ({ talking, className }: MetamaskSVGProps) => (
  <svg
    className={`${className} ${talking ? "talking" : "floating"}`}
    viewBox="0 0 154 154"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path id="rightEarMuff" d="M132.49 17.1594L84.3955 52.8801L93.2894 31.8054L132.49 17.1594Z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round" />
    <path id="leftEarMuff" d="M21.4614 17.1594L69.1695 53.2184L60.7106 31.8054L21.4614 17.1594Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
    <path id="rightEar" d="M134.52 55.2002L138.629 35.4789L132.49 17.1594L85.9906 51.6717L103.875 66.801L129.155 74.1965L134.762 67.671L132.345 65.9309L136.212 62.4024L133.215 60.0822L137.082 57.1337L134.52 55.2002Z" fill="#763D16" stroke="#763D16" strokeLinecap="round" strokeLinejoin="round" />
    <path id="leftEar" d="M15.371 35.4789L19.4796 55.2002L16.8694 57.1337L20.7364 60.0822L17.7878 62.4024L21.6547 65.9309L19.2379 67.671L24.7966 74.1965L50.0766 66.801L67.9611 51.6717L21.4614 17.1594L15.371 35.4789Z" fill="#763D16" stroke="#763D16" strokeLinecap="round" strokeLinejoin="round" />
    <path id="noseHead" d="M84.3955 79.5619L85.9906 51.6717L93.3377 31.8054H60.7106L67.9611 51.6717L69.6529 79.5619L70.2329 88.3591L70.2812 110.014H83.6704L83.7671 88.3591L84.3955 79.5619Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round" />
    <path id="rightBottomFur" d="M115.186 99.9598L102.377 119.584L129.783 127.125L137.662 100.395L115.186 99.9598Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
    <path id="leftBottomFur" d="M16.3861 100.395L24.2166 127.125L51.6234 119.584L38.8142 99.9598L16.3861 100.395Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
    <path id="leftHead" d="M50.0766 66.801L42.4395 78.3534L69.6529 79.5618L68.6862 50.3182L50.0766 66.801Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
    <path id="rightHead" d="M103.875 66.801L85.0239 49.9799L84.3955 79.5618L111.561 78.3534L103.875 66.801Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
    <path id="leftEye" d="M67.091 93.5311L53.4601 89.5192L63.0791 85.1205L67.091 93.5311Z" fill="#233447" stroke="#233447" strokeLinecap="round" strokeLinejoin="round" />
    <path id="rightEye" d="M86.8606 93.5311L90.8726 85.1205L100.54 89.5192L86.8606 93.5311Z" fill="#233447" stroke="#233447" strokeLinecap="round" strokeLinejoin="round" />
    <path id="rightEye" d="M111.561 78.3535L84.3955 79.5619L86.909 93.5311L90.9209 85.1206L100.588 89.5192L111.561 78.3535Z" fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round" />
    <path id="leftEye" d="M53.4602 89.5192L63.1275 85.1206L67.0911 93.5311L69.6529 79.5619L42.4395 78.3535L53.4602 89.5192Z" fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round" />
    <path id="leftZygomatic" d="M42.4394 78.3535L53.8468 100.588L53.4601 89.5192L42.4394 78.3535Z" fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round" />
    <path id="rightZygomatic" d="M100.588 89.5192L100.105 100.588L111.561 78.3535L100.588 89.5192Z" fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round" />
    <path id="leftNose" d="M69.6529 79.5619L67.091 93.5311L70.2812 110.014L71.0063 88.3108L69.6529 79.5619Z" fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round" />
    <path id="rightNose" d="M84.3955 79.5619L83.0904 88.2625L83.6704 110.014L86.909 93.5311L84.3955 79.5619Z" fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round" />
    <path id="rightUpper" d="M86.909 93.5311L83.6704 110.014L85.9906 111.609L100.105 100.588L100.588 89.5192L86.909 93.5311Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round" />
    <path id="leftUpper" d="M53.4601 89.5192L53.8468 100.588L67.9611 111.609L70.2812 110.014L67.091 93.5311L53.4601 89.5192Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round" />
    <path id="outerLeftCheek" d="M51.6234 119.584L53.9435 99.9598L38.8142 100.395L51.6234 119.584Z" fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round" />
    <path id="outerRightCheek" d="M100.057 99.9598L102.377 119.584L115.186 100.395L100.057 99.9598Z" fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round" />
    <path id="rightCheek" d="M129.155 74.1965L103.875 66.801L111.561 78.3534L100.105 100.588L115.186 100.395H137.662L129.155 74.1965Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round" />
    <path id="leftCheek" d="M50.0766 66.801L24.7966 74.1965L16.3861 100.395H38.8142L53.8468 100.588L42.4394 78.3534L50.0766 66.801Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round" />
    <path id="innerLeftCheek" d="M51.6234 119.584L67.9611 111.609L53.8468 100.588L51.6234 119.584Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
    <path id="innerRightCheek" d="M85.9906 111.609L102.377 119.584L100.105 100.588L85.9906 111.609Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
    <g id="metamaskMouth">
      <path id="nose" d="M85.9906 111.609L83.6705 110.014H70.2812L67.9611 111.609L66.7527 122.291L67.8644 121.228H86.0873L87.2957 122.291L85.9906 111.609Z" fill="#161616" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" />
      <path id="chin" d="M87.1507 126.787L87.2957 122.291L86.0873 121.228H67.8644L66.7527 122.291L66.8493 126.787L51.6234 119.584L56.9404 123.935L67.7194 131.427H86.2323L97.0596 123.935L102.377 119.584L87.1507 126.787Z" fill="#C0AD9E" stroke="#C0AD9E" strokeLinecap="round" strokeLinejoin="round" />
      <path id="rightChin" d="M102.377 119.584L85.9906 111.609L87.2957 122.291L87.1507 126.787L102.377 119.584Z" fill="#D7C1B3" stroke="#D7C1B3" strokeLinecap="round" strokeLinejoin="round" />
      <path id="leftChin" d="M51.6234 119.584L66.8493 126.787L66.7527 122.291L67.9611 111.609L51.6234 119.584Z" fill="#D7C1B3" stroke="#D7C1B3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
)