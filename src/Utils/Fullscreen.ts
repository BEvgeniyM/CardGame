interface DocumentWithFullscreen extends HTMLDocument {
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
    msExitFullscreen?: () => void;
    mozCancelFullScreen?: () => void;
    webkitExitFullscreen?: () => void;
}

export function isFullScreen(): boolean {
    const doc = document as DocumentWithFullscreen;
    return !!(doc.fullscreenElement ||
        doc.mozFullScreenElement ||
        doc.webkitFullscreenElement ||
        doc.msFullscreenElement);
}

interface DocumentElementWithFullscreen extends HTMLElement {
    msRequestFullscreen?: () => void;
    mozRequestFullScreen?: () => void;
    webkitRequestFullscreen?: () => void;
}

export function requestFullScreen(element: DocumentElementWithFullscreen) {
    // window.dispatchEvent(new Event('resize')); // FIX BUG with ConteinerElenet Viweport ...... @@ 
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
}

export function deviceDetect():boolean{
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     return  true
    } else {
        return false
    }
}

export function getEventType(): string {
    if ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) {
      return 'touchend';
    }
    return 'mousedown';
}

export function exitFullScreen(doc: DocumentWithFullscreen) {
    if (doc.exitFullscreen) {
        doc.exitFullscreen();
    } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
    } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
    } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
    }
}

export function toogleFullScreen(): void {
    if (isFullScreen()) {
        requestFullScreen(document.documentElement);
    } else {
        exitFullScreen(document);
    }
}