const STATIC_COPY = {
    RESULTS_VIEW: {
        QUOTE_COPY: {
            QUOTE_BEATEN: {
                HEADER: `Good news!`,
                SUBHEADER: `We’ve completed the super-maths and compared your bill to one of our great plans for you.`
            },
            QUOTE_NOT_BEATEN: {
                HEADER: `You're on a better deal`,
                SUBHEADER: `High Five! You're already on a great deal that we can't beat.`
            },
            QUOTE_BEATEN_SPECIAL: {
                HEADER: `We can beat it (special)!`,
                SUBHEADER: `Compared to the bill you uploaded, we can give you a very special deal that would be over the same billing period`
            }
        },
        BONUS_CREDIT_TEXT: "$50 Online Sign-up Credit",
        PLAN_NAMES: {
            MAXIMISER: "Origin Maximiser",
            SAVER: "Origin Saver",
            PREDICTABLE: "Predictable Plan"
        },
        PLAN_BENEFITS: {
            DISCOUNT_RATE_TEXT: " off supply and usage charges",
            MAXIMISER: [
                "Bills and Correspondence via email only", "Pay by direct debit only"
            ],
            SAVER: [
                "Paper or email billing", "Flexible payment options"
            ],
            PREDICTABLE: [
                "Pay the same amount each month", "Applicable for 12 months", "Direct debit only"
            ]
        }
    },
    COMPARISON_SELECTOR: {
        CHOICE_COPY: {
            UPLOAD_BILL: {
                HEADER: `Compare my bill`,
                COPY: [
                    `In just a few easy steps we can help to make your complicated bill comparisons easy and accurate.`,
                    `Just upload your recent bill and we will show a detailed line by line comparison to see if you can save with us at Origin, or not.`,
                    `No commitment, just facts.`
                ]
            },
            MANUAL_ENTRY: {
                HEADER: `Quick compare`,
                COPY: [
                    `No bill, no worries. This tool is designed for those just looking to see how we compare.`,
                    `You will quickly see if you could be saving with Origin.`,
                    `No fuss, no details, just an idea.`
                ]
            }
        }
    },
    UPLOAD_BILL: {
        HEADER: `Upload your bill, it’s the best way to see savings`,
        COPY: [
            `It’s easy as one, two… (that’s it!)`,
            `We’ll need a nice recent and original PDF bill (usually sent by your current provider) so we can do all the fancy calculations in a flash.`,
            `We’ll work out your usage then tell it to you straight… could we save money with Origin, or not.`
        ],
        DROPZONE_TEXT: {
            NO_FILE_TEXT: 'Select your file (or drop here)'
        }
    }
    
};

export default STATIC_COPY;