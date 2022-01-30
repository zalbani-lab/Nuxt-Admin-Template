<template>
  <section>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="1000px"
        max-height="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Modifier l'image
          </v-btn>
        </template>
        <v-card class="mediaContainer">
          <v-card-title class="mediaLibraryHeading">
            <h2 class="mediaLibraryHeading__headline">
              Modifier l'image
            </h2>
            <div class="mediaLibraryHeading__searchBar">
              <input v-model="searchTitle" type="text" placeholder="Rechercher une image par son titre">
              <v-btn
                color="primary"
                dark
                @click="search"
              >
                Rechercher
              </v-btn>
            </div>
            <div class="mediaLibraryHeading__folders folders">
              <div v-for="(folder, index) in imageTypes" :key="index" :class="['folders__item', { 'folders__item--selected': isTheCurrentFolder(folder) }]" @click="changeFolder(folder)">
                {{ folder }}
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="mediaLibrary">
              <div :class="['mediaLibrary__content', {'mediaLibrary__content--hasSelectedImage':hasSelectedImage}]">
                <div v-for="image in allImages" :key="image._id" :class="['imageCard', {'imageCard--selected':image === selectedImage}]" @click="choosedMedia(image)">
                  <v-img :src="image.contentUrl" />
                  <p>{{ image.title }}</p>
                </div>
                <p v-if="allImages.length === 0">
                  Il n'y a aucun resultat pour votre recherche !
                </p>
              </div>
              <div v-if="selectedImage !== null" v-cloak class="mediaLibrary__selectedImage">
                <v-form>
                  <v-container>
                    <v-row>
                      <v-img :src="selectedImage.contentUrl" max-height="150" contain />
                      <v-col
                        cols="12"
                        sm="6"
                        md="12"
                      >
                        <v-text-field
                          v-model="selectedImage.title"
                          label="Titre de l'image"
                          type="string"
                        />
                        <v-text-field
                          v-model="selectedImage.legend"
                          label="Legende de l'image"
                          type="string"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-btn
                    v-if="hasBeenModified()"
                    color="primary darken-1"
                    text
                    @click="updateImage"
                  >
                    Modifier
                  </v-btn>
                </v-form>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              v-if="hasSelectedImage"
              color="primary darken-1"
              text
              @click="pushImage"
            >
              Inserer l'image selectioner
            </v-btn>
            <v-btn
              color="secondary darken-1"
              text
              @click="closePopUp()"
            >
              Fermer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </section>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      allImages: [],
      imageTypes: ['fixture', 'animations', 'accessibility', 'partners', 'hosts'],
      currentImageType: '',
      originalImage: null,
      selectedImage: null,
      hasSelectedImage: false,
      searchTitle: '',
      targetFilter: {}
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.getAllMedia()
    },
    getAllMedia () {
      this.currentImageType = this.$nuxt.$route.path.split('/')[2]
      this.targetFilter = {
        target: this.currentImageType
      }
      this.$api.media.getFiltered(this.targetFilter)
        .then(response => (this.allImages = response.data['hydra:member']))
    },
    changeFolder (newFolder) {
      this.currentImageType = newFolder
      this.search()
    },
    search () {
      const params = {
        target: this.currentImageType,
        title: this.searchTitle
      }
      this.$api.media.getFiltered((params))
        .then(response => (this.allImages = response.data['hydra:member']))
    },
    reset () {
      this.originalImage = null
      this.selectedImage = null
      this.hasSelectedImage = false
      this.dialog = false
    },
    async updateImage () {
      await this.$api.media.patch((this.selectedImage))
    },
    pushImage () {
      if (this.hasBeenModified()) {
        this.updateImage()
      }
      this.$emit('update:image', this.selectedImage)
      this.closePopUp()
    },
    closePopUp () {
      this.reset()
    },
    choosedMedia (media) {
      this.hasSelectedImage = true
      this.originalImage = Object.assign({}, media)
      this.selectedImage = media
    },
    hasBeenModified () {
      return !(this.originalImage.title === this.selectedImage.title && this.originalImage.legend === this.selectedImage.legend && this.originalImage.target === this.selectedImage.target)
    },
    isTheCurrentFolder (folder) {
      return this.currentImageType === folder
    }
  }
}
</script>
<style lang="scss" scoped>
.mediaContainer{
  width: 100%;
}
.mediaLibraryHeading{
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 0!important;
  &__headline {
    padding: 10px 0;
  }
  &__searchBar{
    width: 100%;
    height: 40px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    input{
      border-radius: 4px;
      padding: 2px 10px;
      border: 1px solid lightgrey;
      width: 80%;
    }
    button{
      margin: 0 10px;
      width: calc(20% - 20px);
    }
  }
}
.mediaLibrary{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  border-bottom: 1px solid gray;
  padding-bottom: 20px;
  &__content {
    width: 100%;
    height: 400px;
    overflow: scroll;
    overflow-x: hidden;
    border: 1px solid lightgray;
    display: flex;
    flex-wrap: wrap;
    &--hasSelectedImage {
      width: 70%;
    }
  }
  &__selectedImage{
    margin: 0 10px;
    width: 30%;
    height: 400px;
    border-radius: 4px;
    overflow: auto;
    border: 1px solid;
  }
}

.imageCard {
  height: max-content;
  padding: 5px;
  width: 25%;

  &--selected {
    background-color: rgba(0, 0, 0, 0.2);
  }
}

.folders {
  display: flex;
  flex-wrap: nowrap;
  &__item {
    padding: 5px 20px;
    border: 1px solid lightgray;
    border-bottom: none;
    border-radius: 15px 15px 0 0;
    transition-duration: 0.5s;
    text-transform: capitalize;
    font-size: 15px;
    line-height: 20px;
    &--selected{
      background-color: $primary;
      border: 1px solid $primary;
      border-bottom: none;
      color: white;
    }
  }
}

</style>
