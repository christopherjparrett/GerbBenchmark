import React, { useState } from 'react';

function profile(){


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
                  <img src="../assets/user.png" class="user-pic">  

                  <div class="sub-menu-wrap">
                    <div class="sub-menu">
                      <div class="user-info">
                        <img src="../assets/user.png"> 
                        <h2>Matthew Gerber</>  
                      </div>
                    </div>
                  </div>
                    
              </nav>
          </div>
  );
};

export default profile;
