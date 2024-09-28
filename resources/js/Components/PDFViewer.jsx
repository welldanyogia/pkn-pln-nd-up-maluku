import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const PDFViewer = ({ pdfURL }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="pdf-viewer">
            <Document
                file={pdfURL}
                onLoadSuccess={onDocumentLoadSuccess}
                options={{ workerSrc: "/pdf.worker.js" }}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <div className="page-controls">
                <button
                    onClick={() => setPageNumber(pageNumber - 1)}
                    disabled={pageNumber <= 1}
                >
                    Previous
                </button>
                <span>Page {pageNumber} of {numPages}</span>
                <button
                    onClick={() => setPageNumber(pageNumber + 1)}
                    disabled={pageNumber >= numPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PDFViewer;
