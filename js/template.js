document.addEventListener('DOMContentLoaded', function() {
    // Get the page ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('page') || 'default';
    
    // Load the specific content
    fetch(`content/${pageId}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.json();
        })
        .then(data => {
            // Set page title and metadata
            document.title = data.pageTitle || data.title;
            document.getElementById('page-title').textContent = data.pageTitle || data.title;
            
            if (data.description) {
                document.getElementById('page-description').setAttribute('content', data.description);
            }
            
            if (data.keywords) {
                document.getElementById('page-keywords').setAttribute('content', data.keywords);
            }
            
            // Fill in the content title
            document.getElementById('content-title').textContent = data.title;
            
            // Fill in the carousel images
            const carouselContainer = document.getElementById('carousel-container');
            const indicatorsContainer = document.getElementById('carousel-indicators');
            
            // Clear existing slides (if any)
            const existingSlides = carouselContainer.querySelectorAll('.carousel-slide');
            existingSlides.forEach(slide => slide.remove());
            
            // Clear existing indicators (if any)
            const existingIndicators = indicatorsContainer.querySelectorAll('.indicator');
            existingIndicators.forEach(indicator => indicator.remove());
            
            // Add new slides and indicators
            data.images.forEach((image, index) => {
                // Create slide
                const slide = document.createElement('div');
                slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
                slide.style.display = index === 0 ? 'block' : 'none';
                slide.style.width = '100%';
                
                // Create image
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.alt || `Screenshot ${index + 1}`;
                img.style.width = '100%';
                img.style.height = 'auto';
                img.style.borderRadius = '8px';
                
                slide.appendChild(img);
                carouselContainer.insertBefore(slide, carouselContainer.querySelector('.carousel-btn'));
                
                // Create indicator
                const indicator = document.createElement('span');
                indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
                indicator.dataset.index = index;
                indicator.style.display = 'inline-block';
                indicator.style.width = '10px';
                indicator.style.height = '10px';
                indicator.style.backgroundColor = index === 0 ? '#e08e64' : '#bbb';
                indicator.style.borderRadius = '50%';
                indicator.style.margin = '0 5px';
                indicator.style.cursor = 'pointer';
                
                indicatorsContainer.appendChild(indicator);
            });
            
            // Fill in the description
            document.getElementById('content-description').innerHTML = data.description;
            
            // Initialize carousel
            initCarousel();
        })
        .catch(error => {
            console.error('Error loading page content:', error);
            document.getElementById('content-title').textContent = 'Page Not Found';
            document.getElementById('content-description').innerHTML = 
                '<p>Sorry, the requested page could not be found. Please check the URL and try again.</p>';
        });
});

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        
        // Reset all indicators
        indicators.forEach(indicator => {
            indicator.style.backgroundColor = '#bbb';
            indicator.classList.remove('active');
        });
        
        // Show the current slide and activate indicator
        slides[index].style.display = 'block';
        slides[index].classList.add('active');
        indicators[index].style.backgroundColor = '#e08e64';
        indicators[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Next button
    nextBtn.addEventListener('click', function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    });
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1;
        }
        showSlide(newIndex);
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Initialize the carousel
    if (slides.length > 0) {
        showSlide(0);
    }
}