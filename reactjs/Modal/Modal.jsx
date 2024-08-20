import React from 'react';
import Modal from 'react-foundation-modal';
import './Modal.css'
const overlayStyle = {
    backgroundColor: 'rgba(33,10,10,.45)'
};

class Modal2 extends React.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            fname: '',
            number: '',
            error: '',
            result: ''
        };
        this.modalRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.modalRef.current && !this.modalRef.current.contains(event.target)) {
            this.setState({ modalIsOpen: false });
        }
    };

    showPopup = (status) => {
        this.setState({
            modalIsOpen: status
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { fname, number } = this.state;

        if (!fname) {
            this.setState({ error: 'لطفاً نام و نام خانوادگی را وارد کنید.' });
            return;
        }

        if (!number || isNaN(number)) {
            this.setState({ error: 'لطفاً شماره تماس معتبر وارد کنید.' });
            return;
        }

        this.setState({ error: '' });

        try {
            const response = await fetch('/crm.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    name: fname,
                    number: number
                })
            });

            if (!response.ok) {
                throw new Error('خطا در ارسال داده‌ها');
            }

            let resultText = await response.text();

            if (resultText == 'already exist') {
                resultText = 'اطلاعات شما در سامانه قبلا ثبت شده است';
            } else {
                resultText = 'درخواست شما ثبت شد، همکاران ما بزودی در تیم پشتیبانی با شما تماس خواهند گرفت';
            }

            this.setState({ result: resultText });

        } catch (error) {
            this.setState({ error: 'خطا در ارسال داده‌ها' });
        }
    };

    render() {
        return (
            <div>
                <div onClick={() => this.showPopup(true)} style={{margin: '0 auto', textAlign: 'center'}}>
                    <label
                        style={{
                            margin: '0 auto',
                            fontFamily: 'iransans',
                            cursor: 'pointer',
                            textAlign: 'center',
                            width: '60%',
                            display: 'block',
                            color: '#FFF',
                            backgroundColor: '#ff842d',
                            padding: '10px 25px',
                            borderRadius: '10px'
                        }}
                        htmlFor="modal2"
                        className="btn--jump is-active example-label">
                        دریافت مشاوره رایگان
                    </label>
                </div>

                <Modal
                    open={this.state.modalIsOpen}
                    closeModal={() => this.showPopup(false)}
                    isModal={true}
                    size="small"
                    overlayStyle={overlayStyle}
                >
                    <div ref={this.modalRef}>
                        <p className="lead">فرم مشاوره</p>
                        <hr/>

                        <div style={{padding: '10px', direction: 'rtl'}}>
                            <form onSubmit={this.handleSubmit}>
                                <label htmlFor="fname">نام و نام خانوادگی</label>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    value={this.state.fname}
                                    onChange={this.handleInputChange}
                                />

                                <label htmlFor="number">شماره تماس</label>
                                <input
                                    type="text"
                                    id="number"
                                    name="number"
                                    value={this.state.number}
                                    onChange={this.handleInputChange}
                                />

                                <input
                                    style={{backgroundColor: 'rgba(24,124,72,0.91)', color: '#FFF'}}
                                    id="submit"
                                    type="submit"
                                    value="ثبت"
                                />

                                {this.state.error && <div
                                    style={{fontFamily: 'iransans',color: 'red', marginTop: '10px', textAlign: 'center'}}>{this.state.error}</div>}
                                {this.state.result && <div style={{
                                    fontSize: '14px',
                                    marginTop: '10px',
                                    textAlign: 'center'
                                }}>{this.state.result}</div>}
                            </form>
                        </div>
                    </div>
                </Modal>

                <section className="footer2 show-for-small-only" style={{
                    bottom: '0',
                    position: 'fixed',
                    right: '0',
                    left: '0',
                }}>
                    <div onClick={() => this.showPopup(true)}  className="div btn btn--jump is-active" style={{
                        backgroundColor: 'rgb(115 186 199)',
                        width: '84%',
                        textAlign: 'center',
                        margin: '0 auto',
                        height: '60px',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        zIndex: 999999999,
                        fontFamily: 'iransans'
                    }}>
                        <label style={{color: '#FFF'}} htmlFor="modal2">دریافت مشاوره رایگان</label>
                    </div>
                </section>
            </div>
        );
    }
}

export default Modal2;
