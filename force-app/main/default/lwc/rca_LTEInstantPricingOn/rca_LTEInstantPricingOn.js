/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement } from 'lwc';

export default class Rca_LTEInstantPricingOn extends LightningElement {
    isInBuilder = false;

    connectedCallback() {
        // Check if is in Builder
        var wlhref = window.location.href;
        if (wlhref) {
            if (wlhref.includes('flexipageEditor')) {
                this.isInBuilder = 'true';
            }
        }
    }

    renderedCallback() {
        if(!this.isInBuilder) {
            setTimeout(function(){
                // The NodeIterator interface represents an iterator to traverse nodes of a DOM subtree in document order.
                const nodeIterator = document.createNodeIterator(
                    document.body, // Start on Document.Body
                    NodeFilter.SHOW_ELEMENT,
                    (node) =>
                        (node.nodeName.toLowerCase() === "lightning-input" // Filter to only find <lightning-input> nodes
                            ? NodeFilter.FILTER_ACCEPT
                            : NodeFilter.FILTER_REJECT),
                );
                let lightningInputNodes = [];
                let currentNode;
                
                // Iterate over nodeIterator to add filtered <lightning-input> nodes to lightningInputNodes
                while ((currentNode = nodeIterator.nextNode())) {
                    lightningInputNodes.push(currentNode);
                }

                // Filter lightningInputNodes to keep only instantpricingtoggle toogles
                // !!! Use Filter and Loop over toogleNodes as "Instant Pricing" may be present two time on the page !!!
                let toogleNodes = lightningInputNodes.filter(item => item.getAttribute('data-id') === "instantpricingtoggle");
                
                toogleNodes.forEach((toogleNode) => { 
                    // Create a new toogleNodeIterator starting on the toogleNode to filter to only the <input> which is the "real" toogle
                    const toogleNodeIterator = document.createNodeIterator(
                        toogleNode, // Start on the toogleNode
                        NodeFilter.SHOW_ELEMENT,
                        (node) =>
                            (node.nodeName.toLowerCase() === "input" // Filter to only find <input> nodes
                                ? NodeFilter.FILTER_ACCEPT
                                : NodeFilter.FILTER_REJECT),
                    );
                    let toogleInputNodes = [];
                    
                    // Iterate over toogleNodeIterator to add filtered <input> nodes to toogleInputNodes
                    while ((currentNode = toogleNodeIterator.nextNode())) {
                        toogleInputNodes.push(currentNode);
                    }                

                    // Click on the toogle
                    toogleInputNodes[0].click();

                });            
            }, 1000);
        }
    }
}