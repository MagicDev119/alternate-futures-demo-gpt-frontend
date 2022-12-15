import { Box, Button, Input, CardMedia } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

const Prepare = () => {
  const navigate = useNavigate()
  setTimeout(() => {
    navigate('/vision/list')
  }, 5000);
  useEffect(() => {
    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    var msX = Math.random() * 200,
      msY = Math.random() * 200,
      c = document.getElementById('prepare_canvas'),
      $ = c.getContext("2d"),
      w = c.width = parseInt((window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth) / 20) * 20,
      h = c.height = parseInt((window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth) / 20) * 20,

      a = 0.1,
      t = 0,

      clr = function () {
        $.fillStyle = "hsla(0,5%,5%,1)";
        $.fillRect(0, 0, h, w);
      },

      glitched = function (a, s) {
        a = a || 1;
        var i = 3;
        var col = "rgba(";
        while (i--) {
          col += (s * (i + 3) * (msX / 100) * (msY / 100)) % 255 + ",";
        }
        col = col + a + ")";
        return col;
      },

      anim = function () {
        t++;
        var d = w + 20;
        while (d -= 20) {
          var b = h + 20;
          while (b -= 20) {
            $.fillStyle = glitched(a, b + d * t);
            $.fillRect(b - 15, d - 15, 15, 15);
          }
        }
        window.requestAnimFrame(anim);
      };

    window.addEventListener('click', function (e) {
      a = (Math.random() * 1) + 0.1;
    }, false);

    window.addEventListener('touchstart', function (e) {
      a = (Math.random() * 1) + 0.1;
    }, false);

    window.addEventListener('mousemove', function (e) {
      msX = e.pageX;
      msY = e.pageY;
    }, false);

    window.addEventListener('touchmove', function (e) {
      msX = e.touches[0].pageX;
      msY = e.touches[0].pageY;
    }, false);

    anim();

    console.log(document.getElementById('prepare_canvas'))
    //setAttribute(name, value)
    // document.getElementById('prepare_canvas').style.width = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
    // document.getElementById('prepare_canvas').style.height = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
  }, [])

  return (
    <>
      <Box component="div" className="main-style" sx={{ px: 0, pt: 0, pb: 0, justifyContent: 'space-evenly' }}>
        <Box component="div" sx={{ pt: 0, width: '100vw', height: '100vh' }}>
          <Box component="div" sx={{ position: 'relative', width: '100vw', maxWidth: '600px', height: '100vh', overflow: 'hidden' }}>
            <canvas id='prepare_canvas'></canvas>
            <Box component="span" className='textOverElement'>Visualizing your future vision...</Box>
          </Box>
        </Box>
        {/* <Box component="div" className="footer fillAvailable" sx={{ flex: 'initial', pt: 0, pb: 6 }}>
          <Box component="p" className="descriptionLg" sx={{ m: '5vw', textAlign: 'center', mt: 0 }}>
            Visualizing your future vision...
          </Box>
        </Box> */}
      </Box>
      {/* <Box component="div" className="main-style" sx={{ pt: 0, pb: 0, justifyContent: 'space-evenly' }}>
        <Box component="div" sx={{ pt: 6 }}>
          <Box component="div" className="center-circle" sx={{ position: 'relative' }}>
            <svg width="100%" height="100%">
              <circle cx="50%" cy="50%" r="38%" fill="#C2F947">
                <animate attributeType="XML" attributeName="r" values="38%;45%;38%"
                  dur="1.5s" begin="0.25s" repeatCount="indefinite" />
              </circle>
            </svg>
            <Box component="span" className='textOverElement'>Visualizing</Box>
          </Box>
        </Box>
        <Box component="div" className="footer fillAvailable" sx={{ flex: 'initial', pt: 0, pb: 6 }}>
          <Box component="p" className="descriptionLg" sx={{ m: '5vw', textAlign: 'center', mt: 0 }}>
            Visualizing your future vision...
          </Box>
        </Box>
      </Box> */}
    </>
  )
}
export default Prepare