import styles from "./GaspFactorCard.module.scss";
import React from "react";
import { APIGaspFactorType } from "../../types/api";

type GaspFactorCardProps = Omit<APIGaspFactorType, "id"> & {
  stackVertical?: boolean;
};

const GaspFactorCard: React.FC<GaspFactorCardProps> = ({
  bloodiness,
  scariness,
  suspense,
  stackVertical,
}) => {
  return (
    <div
      className={`${stackVertical ? styles["vertical-gasp-factor"] : styles["horizontal-gasp-factor"]}`}
    >
      <div className={styles["gasp-factor-top"]}>
        <div className={styles["gasp-factor-top-left"]}>
          <h4>Gasp Factor</h4>
          <small>Gasp factor is the average rating</small>
        </div>
        <div className={styles["gasp-factor-top-right"]}>
          {((bloodiness + scariness + suspense) / 3 / 10).toFixed(2)}
        </div>
      </div>
      <div className={styles["gasp-factor-bottom"]}>
        <div className={styles["gasp-factor-factor"]}>
          <div className={styles["gasp-factor-icon"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="23"
              height="25"
              viewBox="0 0 23 25"
              fill="none"
            >
              <rect
                x="0.7892"
                width="22.1525"
                height="25"
                fill="url(#pattern0)"
              />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_24_266"
                    transform="matrix(0.0104167 0 0 0.00923019 0 0.0569507)"
                  />
                </pattern>
                <image
                  id="image0_24_266"
                  width="96"
                  height="96"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
          <div className={styles["gasp-factor-value"]}>
            <small>Suspense</small>
            {suspense}%
          </div>
        </div>
        <div className={styles["gasp-factor-factor"]}>
          <div className={styles["gasp-factor-icon"]}>
            <svg
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="22.1525" height="22" fill="url(#scariness)" />
              <defs>
                <pattern
                  id="scariness"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_7_218"
                    transform="matrix(0.010345 0 0 0.0104167 0.00344128 0)"
                  />
                </pattern>
                <image
                  id="image0_7_218"
                  width="96"
                  height="96"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
          <div className={styles["gasp-factor-value"]}>
            <small>Scariness</small>
            {scariness}%
          </div>
        </div>
        <div className={styles["gasp-factor-factor"]}>
          <div className={styles["gasp-factor-icon"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="23"
              height="20"
              viewBox="0 0 23 20"
              fill="none"
            >
              <rect width="22.1525" height="20" fill="url(#drop)" />
              <defs>
                <pattern
                  id="drop"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_24_268"
                    transform="matrix(0.00940452 0 0 0.0104167 0.048583 0)"
                  />
                </pattern>
                <image
                  id="image0_24_268"
                  width="96"
                  height="96"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFNElEQVR4nO2dS2hdRRjHv2gfJnfmXmtbtRXFhassBA3V3PlOuCoWKrqNCIrSNPPdGonFB66UVBcKvioo4mvRhVoXovgARagLF4JWV1GjRquVrtRYrKU2QXJkbh5cg2lvbs493zcz5wd/CLmvmf935nHmdQA8RiU7NztxpyNO+u/pVmg/VWgPXbD9thJ3cuJicPBsbehtjZQ6KaT3oTa2hjtZ0aCNfW7B/Ca9zJ2uKFBID/2P+Qsl4UHu9AVN2QzfqpFmlwtA47Uq7eROZ5CUqsPXaaSZ05i/oBn3Xu70BkXl6vql2tCvLZi/UBVNlft3Xcad7iDYaIa0RjveqvlNmtjQRxXu9HvO2FkK6Z02zJ8rCcZ+4Lqs3LnwFm3osXbNX5ShR7nz4SUqocEz9Hha1azrPXHnxysqA3SlRnsyA/PnZU+67+TOlzeNrkL7bXbmL/aMfiga5RbQSG9mbX5To/wuAHR1/jLyFI12T6fMX1SV7ubOp0jKVbtNI013PADubtpQlTu/oqjU7jhXGTqcg/nzVREd0dvu2sidbyl0aUNv5WV+UxDeK9oDaNT79+dtfpPug5gpz9X7rYxwdqw9cGmAGNnSRz2d6O+vuCpCmtxcG1EQG8tMK6YsQTD0LMREGevbMxrnSTPSrEZ7A8TS5dRojwowPf2v7FGXNggdbewr/GbTcgp7ZUUJ69cIq3rSpVVRKbHXQ7gr2WhSgMnp6eTuyINcaacMPcFtrm41CGgfh5BQSb2X+YYrXZEM/VNKdl0OoaCRPmY3FVesT4IYKyrh8M0CzEzbkZuXhgCWkP/EbaRuV8b+4nWDrNHuZTcRVyu7F3xE1WiTQjrObyCtSsrYv0rV3eeDbyikp7nN01kFAe1T4BPdZmhrtut6iFeG/j5n4M6LwRe0sS+ym4aZB+EF8IENSJd4ddOFLWvG5Q2k49OQgw5tiKKxrNDQsYAD8Od5V42WQSpu1Rm3SbrDKhsaBcGbKcQPN+tVlwKadHkFoZvo0hhUMnQtSMNN53Ebo/PTSyCKPlqr0P4uwJg0Dylj/4DewXUgBZ0M38Rtis5bVboRpKAM7Wc3BPMuBbQfpOD1mD+2HYDDIGfgjd8QzaDu/vpF3P57PeWoQ5iyVMbuizYAxu6TEICPog0A0ocSAvB9vCWAvpPQBT0WcQmYkjAEEeLkS9qipiUEII+9valIGXtKwuqHqXgDQL9JaAOOsBuBEd8NK0NfRhsAtIckLD98I+IS8JqEY8UeiTgAY9z+Q6lqb+E2QjPJjYNx+x/3aKgZ2goSiHQ4YgKkoJGeF2BIGu3xBiqxtegCkNQRBNGV54lXmtt8pJ/FbeDTSA9HEwAjoPu5FHcGm9vOE4H5J8Q+OEgZeiaCADwJUnGrBEIuBQrpeE9t5EKQjDL2AW6jdKdk6F4QTx+t1cZ+zW4WZi077s2jsirJcJ+bLQrnyrenvDt9PaTdMiqxI+AhXRrpgPfmGwFj/m3TO7jOLV7iNlG3r4OwY3Q9+P9ABvrcuysf7Wcu7RAC7mRaz0rCQdHbUdtix+h6H9oEhfSqqO1HWaOxfrvIgzyM6zbbPeJGOTt3n0BfsZu+KDveU919BURFbWyNu+Lc9n+26sbQicaJWCFXOWeiZ4C2uMOd5szIz3h3CJP4gbXcjzgzNNbJmTX33Y3fqNEm7vxKpkshJfPPF5jIwPhv3AS6+84oGthOVFGlxkbAxgmMB5ShL5SxP86vynZL46fd343/zb32unuv+4z7LHf6CwoKCgoKCgoKCgoKYAn/AkwoK2lC2dGTAAAAAElFTkSuQmCC"
                />
              </defs>
            </svg>
          </div>
          <div className={styles["gasp-factor-value"]}>
            <small>Bloodiness</small>
            {bloodiness}%
          </div>
        </div>
      </div>
    </div>
  );
};

export { GaspFactorCard };
