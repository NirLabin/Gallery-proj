'use strict';
init();
function init() {
  renderGallery();
}

function renderGallery() {
  var strHtmls = '';
  strHtmls += gProjs
    .map(function (proj) {
      return `
    <div class="col-md-4 col-sm-6 portfolio-item">
      <a
        class="portfolio-link"
        data-toggle="modal"
        data-proj-id="${proj.id}"
        href="#modal"
      >
        <div class="portfolio-hover">
          <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
          </div>
        </div>
        <img
          class="img-fluid"
          src="img/portfolio/${proj.id}-thumbnails.jpg"
          alt=""
        />
      </a>
      <div class="portfolio-caption">
        <h4>${proj.title}</h4>
        <p class="text-muted">${proj.name}</p>
      </div>
      </div>`;
    })
    .join('');
  document.querySelector('.container-gallery').innerHTML = strHtmls;
}
//
$('.portfolio-link').click(renderModal);
function renderModal(e) {
  e.preventDefault();
  console.log(this);
  var proj = getProjById(this.getAttribute('data-proj-id'));
  console.log(proj);
  var strHtml = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="close-modal" data-dismiss="modal">
            <div class="lr">
              <div class="rl"></div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <div class="modal-body">
                  <!-- Project Details Go Here -->
                  <h2>${proj.name}</h2>
                  <p class="item-intro text-muted">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                  <img
                    class="img-fluid d-block mx-auto"
                    src="img/portfolio/${proj.id}-full.jpg"
                    alt=""
                  />
                  <p>
                    Use this area to describe your project. Lorem ipsum dolor
                    sit amet, consectetur adipisicing elit. Est blanditiis
                    dolorem culpa incidunt minus dignissimos deserunt repellat
                    aperiam quasi sunt officia expedita beatae cupiditate,
                    maiores repudiandae, nostrum, reiciendis facere nemo!
                  </p>
                  <button class="btn btn-success" onclick="window.open('${proj.link}')">Check it out</button>
                  <ul class="list-inline">
                    <li>Date: January 2017</li>
                    <li>Client: Threads</li>
                    <li>Category: Illustration</li>
                  </ul>
                  <button
                    class="btn btn-primary"
                    data-dismiss="modal"
                    type="button"
                  >
                    <i class="fa fa-times"></i>
                    Close Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 `;

  var elModal = document.querySelector('.modal');
  elModal.innerHTML = strHtml;
}
