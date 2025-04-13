import React, { useState } from 'react';

function Profile(){


  return (
          <div id="profileDiv">
              <nav>
                  <img src="../assets/logo.png" class="logo">
                  <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                  </ul>
                  <img src="../assets/user.png" class="user-pic" onclick="toggleMenu()">  

                  <div class="sub-menu-wrap" id="subMenu">
                    <div class="sub-menu">
                      <div class="user-info">
                        <img src="../assets/user.png"></img> 
                        <h3>Matthew Gerber</h3>  
                      </div>
                        <hr>

                        <a href="#" class="sub-menu-link"/>
                          <img src="../assets/logo.png"/>
                          <p>Log Out</p>
                            <span> > </span>

                        <a href="#" class="sub-menu-link">
                          <img src="../assets/logo.png"/>
                          <p>Delete User</p>
                            <span>></span>
                    </div>
                  </div>
                    
              </nav>
          </div>

        <script>
          let subMenu = document.getElementById("subMenu");

          function toggleMenu(){
            subMenu.classList.toggle()"open-menu");
          }
        </script>
  );
};

export default Profile;
