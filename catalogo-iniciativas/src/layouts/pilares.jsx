import React from 'react';
import'../components/home.css'
const Pilares =React.forwardRef(function PilaresComponent(props, ref){
    return(
        <> 
        <div className="container" ref={ref}>
            <div className="row">
                <div className="col-12 fontpilar centerall" style={{ whiteSpace: 'nowrap' }}>
                    PILARES PRINCIPALES 
                </div>
            </div>
            <div className="row">
            <div className="col-12 centerall fontpilarmin"  style={{ whiteSpace: 'nowrap' }}>
            de la agroecología:
                </div>
            </div>
          
            <div className="row mgcont1">
  <div className="col-lg-4 col-md-4 col-sm-12 col-xsm-12  center d-flex flex-column align-items-center">
    <img src="/src/assets/pilar1.png" alt="Pilar 1" />
    <p className='fontPpilares'>SOSTENIBILIDAD AMBIENTAL</p>
  </div>
  <div className="col-lg-4 col-md-4 col-sm-12 col-xsm-12  center d-flex flex-column align-items-center">
    <img src="/src/assets/Pilar2.png" alt="Pilar 2" />
    <p className='fontPpilares'>EQUIDAD SOCIAL</p>
  </div>
  <div className="col-lg-4 col-md-4 col-sm-12 col-xsm-12 center d-flex flex-column align-items-center">
    <img src="/src/assets/Pilar3.png" alt="Pilar 3" />
    <p className='fontPpilares'>VIABILIDAD ECONÓMICA</p>
  </div>
</div>
        </div>
        <div className="row mgcont1">
      <div className="col-12 center">
        <p className='fontpilar 'style={{ whiteSpace: 'nowrap' }}>
          INICIATIVAS DESTACADAS
        </p>
      </div>
    </div>
        </>
    
    );
});
Pilares.displayName='Pilares';
export default Pilares;