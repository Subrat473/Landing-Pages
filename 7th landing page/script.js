var tl = gsap.timeline();









tl.to(".imagecontainer", {
    ease: "expo.easeInOut",
    width: "100%",
    stagger: 2
});

to(".text h1", {
    ease: expo.easeInOut,
    stagger: 2,
    top: 0
})
.to(".text h1",{
    delay: 2,
    ease: expo.easeInOut,
    stagger: 2,
    top: "-100%"
})

