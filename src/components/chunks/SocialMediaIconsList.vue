<script>
import TwitterSVG from "@/assets/social-media/twitter.svg";
import FacebookSVG from "@/assets/social-media/facebook.svg";
import LinkedInSVG from "@/assets/social-media/linked-in.svg";
import InstaSVG from "@/assets/social-media/insta.svg";
import GithubSVG from "@/assets/social-media/github.svg";
import BeSVG from "@/assets/social-media/be.svg";
import BallSVG from "@/assets/social-media/ball.svg";
export default {
  components: {
    TwitterSVG,
    FacebookSVG,
    LinkedInSVG,
    InstaSVG,
    GithubSVG,
    BeSVG,
    BallSVG,
  },
};
</script>

<template>
  <ul class="socials">
    <li><TwitterSVG alt="twitter" /></li>
    <li><FacebookSVG alt="facebook" /></li>
    <li><LinkedInSVG alt="linked-in" /></li>
    <li><InstaSVG alt="instagram" /></li>
    <li><GithubSVG alt="github" /></li>
    <li><BeSVG alt="Be company" /></li>
    <li><BallSVG alt="International company" /></li>
  </ul>
</template>

<style scoped lang="scss">
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  text-align: center;
}
.socials {
  margin: 0;
  padding: 24px 20px;
  display: flex;
  justify-content: space-around;
  background: #f7f7f7;
  @include media-sm {
    margin-top: 2px;
  }
  @include media-md {
    flex-flow: column;
    align-content: center;
  }
}
</style>
