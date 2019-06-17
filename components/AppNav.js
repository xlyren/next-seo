import React from 'react'
import Link from 'next/link'

const links = [
    {name:"首页",link:"/"},
    {name:"关于我们",link:"/about"}
]

const Nav = () => (
    <nav className="home-header">
        <ul>
            {links.map(({ name, link }) => (
                <li key={name}>
                    <a href={link}>
                        {name}
                    </a>
                </li>
            ))}
        </ul>
        <style jsx>{`
            .home-header{
                border-top: 1px solid #f2f2f2;border-bottom: 1px solid #f2f2f2;
                height: 51px;line-height: 51px;border-top: 1px solid #f2f2f2;background-color: #fff;
            }
            .home-header ul{text-align: center;}
            .home-header ul li {text-align: center;padding:0 15px;display: inline-block;}
            .home-header ul li a{color:#000;}
        `}</style>
    </nav>
)

export default Nav
