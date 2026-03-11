# Read One Piece

<p align="center">
  <img width="50%" alt="App screenshot" src="https://github.com/user-attachments/assets/525606c9-ed09-40c8-a559-fdd73977086b" />
</p>

After a journey that I wasn't expecting to be this long, this place here deserves some details:

- My initial motivation was simple. I had been reading One Piece from here: https://ww12.readonepiece.com/. I think this is a totally fine website. You basically scroll to go to the next page. But the thing is, the website doesn't fit the current manga page to the window. Because of this, reading on desktop becomes not that enjoyable. Also, on mobile, sometimes you feel in need of zooming in. It is pretty neat but not perfect. I want to swipe pages left-to-right, and snap the current page to the screen.
- Why not make an app that supports the features I desire?
- Okay, I have to fetch the manga page images from there somehow to display them on my app. Oops, they have Cloudflare protection. Oh, what's that? It's solvable by putting some necessary request headers.
- After some research, it appears that changing request headers on the browser isn't possible. So, I need something that serves as a simple backend. Is there something totally free out there?
- [Cloudflare Workers](https://workers.cloudflare.com/)! Wow, it is capable of doing literally everything I want my backend to do.
  - I'm not currently going to dive into details of this. It's left to the reader to discover how to utilize it:)
- Alright, fetching images is done. Of course I'm gonna use React as the framework as it's the one that I'm most used to.
- Now, which library for swiping? Okay, there exists a popular library literally called [Swiper](https://swiperjs.com/). That was too easy.
  - It has come out to be not a perfect library for my needs, but it indeed met the requirements with some workarounds.
- Is there any other library tho? Just curious. So, there is [shadcn's carousel](https://ui.shadcn.com/docs/components/radix/carousel), which is under the hood [Embla Carousel](https://www.embla-carousel.com/). Wait, why is it so laggy on my phone? Not preferable!
  - [UFO Test](https://testufo.com/) also shows 60 FPS. Why? My phone has 120 Hz enabled.
  - It turns out that Chrome has a flag under `chrome://flags`: `throttle-main-thread-to-60hz`, which was set to `auto` on my Chrome. I disabled it, and Carousel instantly started working smoothly.
  - Still, Swiper is my go-to.
- Let's show the very first version to my friend who also loves One Piece. Oh, she reads it in Turkish on [MangaDenizi](https://www.mangadenizi.net/). Alright, let's also fetch the Turkish pages from there.
- Giving credits is important! Hence the app footer.
- Sometimes it lags, not terrible but a little annoying. I wonder if some other framework would perform better. Hence the [Svelte version](https://github.com/brkdnmz/read-one-piece-svelte).
- Theme, full screen, up-down swiping, app guide...
- After more than a month, it is actually ready!

## Misc.

- For the logo as well as some stylized texts, I used this: https://www.textstudio.com/logo/one-piece-logo-759
- I also used a One Piece font: https://fontmeme.com/fonts/one-piece-manga-font/
- Also, [here's the gun](https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Fivr9lypipk591.png%3Fwidth%3D315%26format%3Dpng%26auto%3Dwebp%26s%3D646579de2e8f6e47f13da56efc5f2a335e63a2b8) that appears on the first pages of every volume that I used for indicating the left/right direction.
- Turkish translation:
  - Colored up to 838: https://www.mangadenizi.net/manga/one-piece-renkli
  - Black & white for the rest: https://www.mangadenizi.net/manga/one-piece
