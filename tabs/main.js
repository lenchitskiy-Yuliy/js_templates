window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');

    function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsContainer = document.querySelector(tabsParentSelector);
    
        function hideTabsContent() {
    
            tabsContent.forEach(item => {
                item.style.display = 'none';
            });
    
            tabs.forEach(item => {
                item.classList.remove(activeClass);
            });
    
        }
    
        function showTabsContent(i = 0) {
            tabsContent[i].style.display = 'block';
            tabs[i].classList.add(activeClass);
        }
    
        hideTabsContent();
        showTabsContent();
    
        tabsContainer.addEventListener('click', (event) => {
            const target = event.target;
    
            if ( target && target.classList.contains(tabsSelector.slice(1)) ) {
                tabs.forEach((item, i) => {
                    if ( target == item )  {
                        hideTabsContent();
                        showTabsContent(i);
                    }
                });
            }
        });
    }
})
