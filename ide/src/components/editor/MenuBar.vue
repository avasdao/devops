<template>
  <div class="wrapper">
    <promotion-banner />
    <div id="fs_control">
      <div class="panel panel-default">
        <div class="headPanel panel-heading">
          <div class="btn-group">
            <button id="submit" type="button" class="btn btn-sm btn-run" :class="{ loading : disabled }"
                    @click="runCode()" :disabled="loading">
              <i class="fa fa-play" aria-hidden="true"></i>
              <span v-if="loading">Running</span>
              <span v-else> Run </span>
            </button>

            <language :options=languages :selected=selectedLang></language>

            <button type="button" id="custInp" class="btn btn-sm btn-menu" @click="InOutBoxToggle()">
              Input <i class="fa fa-keyboard-o" aria-hidden="true"></i>
            </button>

            <div class="btn-group" :class="{ fileOptionOpen : isFileOptionOpen}"  @click="fileOptionOpen">
              <button id="panelLang" type="button" class="btn btn-sm btn-menu"
                      aria-haspopup="true" aria-expanded="false" @blur="fileOptionClose" >
                file
                <span class="fa fa-caret-down"></span>
                <span class="fa fa-file-code-o"></span>
              </button>

              <ul class="dropdown-menu">
                <li>
                  <button class="btn btn-sm btn-menu">
                  <router-link class="decoration-none" to="/" target="_blank" active-class="" exact-active-class="">
                    New <i class="fa fa-file-code-o" aria-hidden="true"></i>
                  </router-link>
                  </button>
                </li>

                <li>
                  <button class="btn btn-sm btn-menu" @click="forkFile()" >
                  <router-link class="decoration-none" to="/"  active-class="" exact-active-class="">
                    Fork <i class="fa fa-code-fork" aria-hidden="true"></i>
                  </router-link>
                  </button>
                </li>
                <li>
                  <button type="button" id="save" class="btn btn-sm btn-menu" @click="checkToShowSaveModal()">
                    Save <i class="fa fa-floppy-o" aria-hidden="true"></i>
                  </button>
                </li>

                <li>
                  <button type="button" id="download" class="btn btn-sm btn-menu" @click="checkToShowDownloadModal()">
                    Download <i class="fa fa-download" aria-hidden="true"></i>
                  </button>
                </li>
                
                <li>
                  <input type="file" ref="fileUpload" style="display:none" @change="uploadCode">
                  <button type="button" id="uploadFile" class=" btn btn-sm btn-menu" @click="selectFile">
                    Upload <span class="fa fa-folder-open" aria-hidden="true"></span>
                  </button>
                </li>
              </ul>
            </div>

            <div class="btn-group" :class="{viewOptionOpen : isViewOptionOpen}"  @click="viewOptionOpen">
              <button id="panelLang" type="button" class="btn btn-sm btn-menu"
                      aria-haspopup="true" aria-expanded="false" @blur="viewOptionClose" >
                view
                <span class="fa fa-caret-down"></span>
                <span class="fa fa-eye" aria-hidden="true"></span>
              </button>

              <ul class="dropdown-menu">
                <li>
                  <button type="button" id="settingButton" class="btn btn-sm btn-menu" @click="settingsToggle">
                    Settings <span class="fa fa-cog"></span>
                  </button>
                </li>
                  <button id="panelLang" type="button" class="btn btn-sm btn-menu" @click="showShortcutsModal()">
                    Shortcuts <i class="fa fa-reply-all" aria-hidden="true"></i>
                  </button>
                <li>
                </li>
              </ul>
            </div>

            <input type="file" id="upload" style="display:none;">
            <share></share>

          </div>
          <div class="renameFilename">
            <input id="file-name-input" class="black" type="text" placeholder="Untitled" :value=this.$store.state.fileName @change=changeTitle>
          </div>
          <div class="logoMenu">
            <login-button></login-button>
            Made with <i class="fa fa-heart" aria-hidden="true" style="color: #e31d3b"></i> by
            <a href="https://codingblocks.com/" target="_blank"><img src="../../assets/cb_logo_light.png"></a>
          </div>
        </div>
      </div>
      <settings v-show="this.$store.state.showSettings"></settings>
    </div>
    
    <modal name="download-modal" transition="pop-out" :width="680" :pivot-y="0.2" :height="auto">
      <div class="download-modal-title flex-center">
        confirm file name
      </div>
      <div class="download-modal-content flex-center">
        <span>File Name:</span>
        <input v-on:keyup.enter="downloadCode" v-on:change="saveFileName" 
              ref="fileName" :value="this.$store.state.fileName" placeholder="Enter File name">
      </div>
      <div class="download-modal-button-set flex-space-between">
        <button class="modal-button" @click="downloadCode()">Download</button>
      </div>
    </modal>

    <modal name="save-modal" transition="pop-out" :width="680" :pivot-y="0.2" :height="auto">
      <div class="save-modal-title flex-center">
        Confirm File name
      </div>
      <div class="save-modal-content flex-center">
        <span>File Name:</span>
        <input v-on:keyup.enter="saveToServer" v-on:change="saveFileName" 
              :value="this.$store.state.fileName" placeholder="Enter File name">
      </div>
      <div class="save-modal-button-set flex-space-between">
        <button class="modal-button" @click="saveToServer()">Save</button>
      </div>
    </modal>

    <modal name="shortcuts-modal" transition="pop-out" :width="600" :pivot-y="0.3" :height="500">
      <div class="shortcuts-modal-title flex-center">
        keyboard shortcuts
        <span @click="closeShortcutsModal()" class="shortcuts-modal-close">??</span>
      </div>
      <ul class="shortcuts-modal-content">
        <li class="key-unit flex-space-between">
          <span class="key-span flex-center">Ctrl + I</span>
          <span class="key-description">To run the program in windows/linux</span>
        </li>
        <li class="key-unit flex-space-between">
          <span class="key-span flex-center">??? + I</span>
          <span class="key-description">To run the program in mac</span>
        </li>
        <li class="key-unit flex-space-between">
          <span class="key-span flex-center">Ctrl + U</span>
          <span class="key-description">To reset the settings in windows/linux</span>
        </li>
        <li class="key-unit flex-space-between">
          <span class="key-span flex-center">??? + U</span>
          <span class="key-description">To reset the settings in mac</span>
        </li>
        <li class="key-unit flex-space-between">
          <span class="key-span flex-center">Ctrl + B</span>
          <span class="key-description">To reset the code in windows/linux</span>
        </li>
        <li class="key-unit flex-space-between">
          <span class="key-span flex-center">??? + B</span>
          <span class="key-description">To reset the code in mac</span>
        </li>
        <li class="key-unit flex-space-between">
          <span class="key-span flex-center">Ctrl + S</span>
          <span class="key-description">To save the code in windows/linux</span>
        </li>
        <li class="key-unit flex-space-between">
          <span class="key-span flex-center">??? + S</span>
          <span class="key-description">To save the code in mac</span>
        </li>
      </ul>
    </modal>
  </div>
</template>

<script>
  import language from './Language.vue'
  import Vue from 'vue'
  import base64 from 'base-64'
  import Settings from './Settings.vue'
  import Share from './Share.vue'
  import LoginButton from '../auth/LoginButton.vue'
  import * as download from 'downloadjs'
  export default {
    name: 'menuBar',
    components: {language, Settings, Share, LoginButton},
    data() {
      return {
        fullscreen: false,
        loading: false,
        fileName: this.$store.state.fileName,
        showBanner: true,
        isFileOptionOpen: false,
        isViewOptionOpen: false,
        def: {
          target:{
            value: this.$store.state.fileName
          }
        }
      }
    },
    mounted() {
      document.addEventListener('keydown', this.keyShortCuts);
      this.$store.commit('changeLanguage', this.$store.state.language)
    },
    destroyed(){
      if(this.$store.state.fileName.split('.')[0] == this.$store.state.title){ // if file name has been changed from default
        this.saveToServer()
      }
      document.removeEventListener('keydown', this.keyShortCuts);
    },
    computed: {
      languages() {
        return Object.values(this.$store.state.langs);
      },
      selectedLang(){
        return this.$store.state.langs[this.$store.state.language];
      },
    },
    methods: {
      runCode() {        
        this.loading = !this.loading
        this.$store.dispatch('runCode').then((data) => {
          console.log(data);
          if (!this.$store.state.showInOutBox)
            this.$store.commit('toggleInOutBox')
          this.loading = false
          if (!data.is_successful && data.result !== 'success') {
            this.$notify({
              text: 'Compilation Error',
              type: 'error'
            })
          } else {
              this.$notify({
                text: 'Code Compiled Successfully',
                type: 'success'
              })
          }
        }).catch(err => {
          console.error(err)
          this.loading = false
          this.$notify({
            text: 'There was some error while running the code, please try again.',
            type: 'error'
          })
        })
      },
      saveToServer() {
        this.closeSaveModal();
        this.$store.dispatch('saveDataToServer')
          .then(({data}) => {
            this.$notify({
              text: 'Code saved to server',
              type: 'success'
            })
            return this.$router.push({name: 'saved', params: {id: data.id}})
          })
      },
      checkToShowSaveModal(){
        if(this.$store.state.fileName.split('.')[0] != this.$store.state.codeTitle) {
          this.showSaveModal();
        }else{
          this.saveToServer();
        }
      },
      checkToShowDownloadModal(){
        if(this.$store.state.fileName.split('.')[0] != this.$store.state.codeTitle) {
          this.showDownloadModal();
        }else{
          this.downloadCode();
        }
      },
      InOutBoxToggle() {
        this.$store.commit('toggleInOutBox')
      },
      settingsToggle() {
        this.$store.commit('toogleSettings')
      },
      selectFile() {
        // open file select dialogue
        this.$refs.fileUpload.click()
      },
      showSaveModal() {
        this.$modal.show('save-modal')
      },
      closeSaveModal() {
        if(this.$store.state.fileName.split('.')[0] != this.$store.state.codeTitle)
          this.saveFileName(this.$data.def);
        this.$modal.hide('save-modal')
      },
      showDownloadModal() {
        this.$modal.show('download-modal')
        setTimeout(() => {
          this.$refs.fileName.select()
        }, 200)
      },
      closeDownloadModal() {
        if(this.$store.state.fileName.split('.')[0] != this.$store.state.codeTitle)
          this.saveFileName(this.$data.def)
        this.saveToServer()
        this.$modal.hide('download-modal')
      },
      resetFileName() {
        this.$store.commit('fileNameChange', `code`)
      },
      forkFile(){
        const code = this.$store.state.code[this.$store.state.language]
        if (!code.length) {
          return
        }
        console.log(code)
        localStorage.forkedLanguage = this.$store.state.language;
        localStorage.forkedCode = code;
        localStorage.setItem('forking', 'true');

        // window.open("http://localhost:8080/")
        window.open("https://ide.codingblocks.com/")
        this.$notify({
          text: 'Forked Successfully',
          type: 'success'
        })
      },
      saveFileName(e) {
        this.$store.commit('fileNameChange', e.target.value)
      },
      downloadCode() {
        this.closeDownloadModal()
        const code = this.$store.state.code[this.$store.state.language]
        download(`data:text/plain;charset=utf-8,${encodeURIComponent(code)}`, this.$store.state.fileName, 'text/plain')
      },
      uploadCode(e) {
        const files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }

        const file = files[0]
        const reader = new FileReader()

        reader.onload = (e) => {
          console.log('Uploaded File: ' + file.name)
          this.$notify({
            text: 'Code Uploaded Successfully',
            type: 'success'
          })
          this.$store.commit('uploadCode', e.target.result)
          this.$store.commit('fileNameChange', file.name)
          this.$refs.fileUpload.value = ""
        }
        reader.readAsText(file)
      },
      showShortcutsModal() {
        this.$modal.show('shortcuts-modal')
      },
      closeShortcutsModal() {
        this.$modal.hide('shortcuts-modal')
      },
      keyShortCuts(e) {
        const isMacLike = navigator.platform.match(/(Mac|iPad)/i) ? true : false
        const isMetaOrCtrlDown = ((isMacLike && e.metaKey) || e.ctrlKey)
        if(isMetaOrCtrlDown && e.keyCode === 73) {
          e.preventDefault()
          this.runCode()
        }
        if(isMetaOrCtrlDown && e.keyCode === 85) {
          e.preventDefault()
          this.$store.commit('resetEditor')
        }
        if(isMetaOrCtrlDown && e.keyCode === 83) {
          e.preventDefault()
          this.checkToShowSaveModal()
        }
        if(isMetaOrCtrlDown && e.keyCode === 66) {
          e.preventDefault()
          this.$store.commit('resetCode', this.$store.state.language)
        }
      },
      fileOptionOpen() {
        this.isFileOptionOpen = !this.isFileOptionOpen
      },
      fileOptionClose () {
        setTimeout(() => { this.isFileOptionOpen=false },250 )
      },
      viewOptionOpen() {
        this.isViewOptionOpen = !this.isViewOptionOpen
      },
      viewOptionClose () {
        setTimeout(() => { this.isViewOptionOpen=false}, 250 )
      },
      changeTitle(e) {
        this.$store.commit('setCodeTitle', e.target.value)
      }
    }
  }
</script>

<style scoped>
  #fs_control {
    position: relative;
    z-index: 20;
  }

  .panel {
    width: 100vw;
    height: 40px;
    margin: 0;
    border: none;
    border-bottom: 1px;
  }

  .panel-heading {
    padding: 0 15px;
    background: #202020;
    color: #fff;
    border-color: #272727;
  }

  .logoMenu {
    float: right;
    font-weight: 700;
    text-transform: uppercase;
  }

  .logoMenu img {
    height: 40px;
  }

  .renameFilename {
    display:inline-block;
    margin-left:10%;
  }

  @media (max-width: 877px) {
    .logoMenu, .renameFilename {
      display: none;
    }
  }

  .fileOptionOpen > .dropdown-menu {
    display: list-item !important;
    background-color: #202020;
    font-size: 14px;
    overflow: hidden;
  }

  .viewOptionOpen > .dropdown-menu {
    display: list-item !important;
    background-color: #202020;
    font-size: 14px;
    overflow: hidden;
  }
</style>

<style>
  .v--modal{
    background-color: #1e1e1e !important;
    color: #fff;
    box-shadow: none !important;
  }
  .v--modal > div{
    border-bottom: 2px solid #1c1c1c;
  }
  .v--modal input{
    background-color: #1e1e1e !important;
    color: #fff !important;
    border-bottom: 1px solid #fff !important;
  }
  .v--modal button{
    background-color: #dc3545 !important;
    color: #fff !important;
    border: none !important;
  }
  .v--modal button:hover{
    background-color: #c82333 !important;
  }

  .btn-run {
    background: #e31d3b;
    border-radius: 50px !important;
    color: white !important;
    height: 35px;
  }
  .panel panel-default {
    padding-top: 5px;
  }

  .btn-run:hover, .btn-run:focus, .btn-run:active {
    box-shadow: none !important;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    color: black;
  }

  .modal-container {
    width: 45vw;
    margin: 0px auto;
    padding: 10px 30px 30px 30px;
    background-color: #fff;
    border-radius: 3px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  .key-span {
    color: #555;
    text-align: center;
    background-color: #eee;
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 0 #fff, 0 1px 0 #ccc;
    font-size: 20px;
    padding: 4px 8px;
    margin: 0 8px;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header {
    padding: 15px 25px !important;
  }

  .modal-footer {
    padding: 15px 0 0 0;
  }

  .modal-header h3 {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 400;
  }

  .modal-body {
    margin: 5px 0;
    font-size: 15px;
  }

  .modal-default-button {
    float: right;
  }

  .modal-footer button {
    color: white;
  }

  .modal-body ul li kbd {
    display: inline-block;
    margin: 0 .1em;
    padding: .2em 1em;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: 10px;
    line-height: 1.4;
    color: #242729;
    text-shadow: 0 1px 0 #FFF;
    background-color: #e1e3e5;
    border: 1px solid #adb3b9;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(12, 13, 14, 0.2), 0 0 0 2px #FFF inset;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .download-modal-title {
    height: 60px;    
    font-size: 24px;
    font-weight: 500;
  }

  .download-modal-content,
  .download-modal-title,
  .download-modal-button-set {
    letter-spacing: 1px;
    padding: 8px;
    text-transform: uppercase;
  }

  .download-modal-button-set .modal-button {
    font-size: 16px;
    text-transform: uppercase;
    color: #8b8c8d;
    background: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    min-width: 100px;
    margin: 4px;
    cursor: pointer;
    border: 1px solid #b4b4b4;
    transition: 0.1s all;
    outline: none;
  }

  .download-modal-button-set .modal-button:hover {
    border: 1px solid #181818;
    color: #181818;
  }

  .download-modal-button-set {
    background-color: #202020 !important;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    justify-content: flex-end !important;
  }

  .download-modal-title {
    background-color: #202020 !important;
    border-bottom: 2px solid #ccc;
  }

  .download-modal-content {
    height: calc(100% - 140px);
  }

  .download-modal-content input {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    padding: 8px;
    margin: 0 8px;
    width: 280px;
    font-size: 16px;
    border: 0;
    border-bottom: 1px solid #b4b4b4;
    color: #b4b4b4;
    font-family: inherit;
    transition: 0.5s all;
    outline: none;
  }

  .download-modal-content input:focus {
    border-bottom: 1px solid #181818;
    color: #181818;
  }

  .shortcuts-modal-title,
  .shortcuts-modal-content {
    padding: 8px;
    color: #b4b4b4;
  }

  .shortcuts-modal-content {
    height: calc(100% - 60px);
    overflow-y: auto;
  }

  .shortcuts-modal-title {
    font-size: 24px;
    font-weight: 500;
    text-transform: uppercase;
    height: 60px;
    border-bottom: 2px solid #ccc;
  }
  
  .shortcuts-modal-content {
    font-size: 16px;
    font-weight: 400;
  }

  .key-span {
    color: #555;
    text-align: center;
    background-color: #eee;
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 0 #fff, 0 1px 0 #ccc;
    font-size: 20px;
    padding: 4px 8px;
    margin: 0 8px;
  }

  .key-unit {
    text-transform: uppercase;
    width: calc(100% - 16px);
    margin: 8px;
  }

  .shortcuts-modal-close {
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 40px;
    font-weight: 500;
    cursor: pointer;
  }

  .shortcuts-modal-close:hover {
    color: #181818;
  }

  .save-modal-title {
    height: 60px;    
    font-size: 24px;
    font-weight: 500;
  }

  .save-modal-content,
  .save-modal-title,
  .save-modal-button-set {
    letter-spacing: 1px;
    padding: 8px;
    text-transform: uppercase;
  }

  .save-modal-button-set .modal-button {
    font-size: 16px;
    text-transform: uppercase;
    color: #8b8c8d;
    background: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    min-width: 100px;
    margin: 4px;
    cursor: pointer;
    border: 1px solid #b4b4b4;
    transition: 0.1s all;
    outline: none;
  }

  .save-modal-button-set .modal-button:hover {
    border: 1px solid #181818;
    color: #181818;
  }

  .save-modal-button-set {
    background-color: #202020 !important;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    justify-content: flex-end !important;
  }

  .save-modal-title {
    background-color: #202020 !important;
    border-bottom: 2px solid #ccc;
  }

  .save-modal-content {
    height: calc(100% - 140px);
  }

  .save-modal-content input {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    padding: 8px;
    margin: 0 8px;
    width: 280px;
    font-size: 16px;
    border: 0;
    border-bottom: 1px solid #b4b4b4;
    color: #b4b4b4;
    font-family: inherit;
    transition: 0.5s all;
    outline: none;
  }

  .save-modal-content input:focus {
    border-bottom: 1px solid #181818;
    color: #181818;
  }

  .decoration-none {
    color: unset
  }
  .decoration-none:hover {
    color: #fc4f4f
  }
  .times {
    position: absolute;
    right: 10px;
    cursor: pointer;
    top: 10px
  }

  .vue-notification {
    margin-top: 45px;
  }
</style>
