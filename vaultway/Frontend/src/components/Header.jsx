import { IoIosLogOut } from 'react-icons/io'
import { VscTriangleDown } from 'react-icons/vsc'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Fragment, useState } from 'react'
import { logout, reset } from '../features/auth/authSlice'
import './Header.css'

const capitalizeFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const accessList = ['lahari', 'Ritish', 'Bhanu'];

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const [showDropdown, setShowDropdown] = useState()

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/authentication')
    }

    const navigateToCloset = (closet) => {
        console.log(`Navigate to closet ${closet}`)
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>VaultWAY</Link>
            </div>
            <ul className="nav__list">
                {/* DROPDOWN BELOW CLOSET NAME */}
                <li>
                    <div className="dropdown__container">
                        <NavLink to='/closets'>
                            <button className="dropdown__button" onClick={() => setShowDropdown(!showDropdown)}>My Closet<VscTriangleDown style={{ marginLeft: '8px' }} /></button>
                        </NavLink>
                        {showDropdown ? (
                            <ul className="dropdown__list" >
                                <li onClick={() => navigate('/')}>My Present collection </li>
                                <li onClick={() => navigate('/')}>My Wish List</li>
                                {accessList && accessList.map((closet) => (
                                    <li key={closet} onClick={() => navigateToCloset(closet)}>{closet}'s Closet</li>
                                ))}
                            </ul>
                        ) : <></>}
                    </div>
                </li>

                <li><NavLink to='/statistics'>Statistics</NavLink></li>
                <li><NavLink to='/settings'>Settings</NavLink></li>
                <li><button className='btn' onClick={onLogout}><IoIosLogOut /></button></li>
            </ul >
        </header >
    )
}

export default Header