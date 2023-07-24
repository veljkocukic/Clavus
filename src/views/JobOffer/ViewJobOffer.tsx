import { faGear } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'components/Button'
import { IconButton } from 'components/IconButton'

export const ViewJobOffer = () => {
    return <div className='page-content' >
        <div className='content-title-bar' >
            <p><span>Pregled ponude</span></p>
            <div className='button-options-container' >
                <Button text='Prihvati ponudu' />
                <IconButton icon={faGear} />
            </div>
        </div>
        <div className='page-halves-layout' >

            <div className='page-half-section' >

                <div className='job-offer-header' >
                    <img className='square-image' src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' alt='worker-image' />
                    <div>
                        <div>
                            <p className='joh-top' >Goran Moler</p>
                            <div className='see-more' >Pogledaj profil</div>
                        </div>
                    </div>
                </div>
                <div className='flex just-between w100 gap1 mt2' >
                    <div className='card-wrapper' >
                        <div className='card-icon-count h100' >
                            <h3>Obavljeni zadaci</h3>
                            <p>7</p>
                        </div>
                    </div>
                    <div className='card-wrapper' >
                        <div className='card-icon-count h100' >
                            <h3>Ocene <br /> klijenata</h3>
                            <p>7</p>
                        </div>
                    </div>
                </div>
                <div className='card-with-title mt1' >
                    <p className='card-title'> Detalji </p>
                    <div className='card-wrapper w100 pad1' >
                        <p>test tes test</p>
                    </div>
                </div>



            </div>
            <div className='page-half-section ' >
                <div className='vtb-expenses-container mt5 ml2' >
                    <h3>Troškovi:</h3>
                    <div>
                        <div className='expenses-parameter' style={{ gridArea: ' 1 / 1 / 2 / 2' }} >1</div>
                        <div className='expenses-parameter' style={{ gridArea: ' 1 / 2 / 2 / 3' }}>2</div>
                        <div className='expenses-parameter' style={{ gridArea: ' 1 / 3 / 2 / 4' }}>3</div>
                        {/* {task?.priceType !== 'WHOLE' && <div className='expenses-parameter' style={{ gridArea: ' 2 / 1 / 3 / 2' }}>{task?.amount}</div>} */}
                        <h3 className='expenses-total'>4</h3>
                    </div>
                </div>
            </div>
        </div>

    </div>
}