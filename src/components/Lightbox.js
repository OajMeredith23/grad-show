import React from 'react'
import * as styles from './lightbox.module.sass'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import FeatherIcon from 'feather-icons-react';
export default function Lightbox({ image, close }) {

    return image ? (
        <div
            className={styles.lightboxContainer}
        >
            <div className={styles.shade} onClick={close}></div>
            <button
                className={styles.closeBtn}
                onClick={close}
            >
                <FeatherIcon icon="x" size="24" />
            </button>

            <GatsbyImage
                className={styles.lightboxImage}
                image={getImage(image)}
            />
        </div>
    ) : <></>
}