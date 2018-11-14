<template>
<transition v-on:after-leave="afterCloseMenu" :duration="{ enter: 800, leave: 300 }">
    <div class="menu" v-if="$menu.showMenu">
    <transition name="menu">
    <div class="menu-wr" v-if="!showMessage">
        <div class="menu-cols">
            <!-- Contacts col -->
            <div class="menu-col menu-col-left">
                <div class="menu-col-wr" v-if="$mq === 'desktop'">
                    <div class="menu-categories">
                        <router-link v-for="(link,index) in $config.categories" :key="index" :to="link.link.original" class="menu-categories-item" tag="div">
                            <a class="menu-categories-link"> {{ link.name }}</a>
                        </router-link>
                    </div>

                    <div class="menu-contacts-tabs-wr">
                        <contact-tabs id="menu-contacts-tabs"></contact-tabs>
                    </div>

                    <div class="menu-studio">
                        <studio-link></studio-link>
                    </div>
                </div>

                <div class="menu-col-wr" v-if="$mq !== 'desktop'">
                    <div class="menu-mobile">
                        <div class="menu-mobile-trial">
                            <v-button link='/trial' text="Пробная партия" type="link"></v-button>
                        </div>
                        <div class="menu-mobile-nav">
                            <div class="menu-mobile-nav-item">
                                <router-link class="menu-mobile-nav-link menu-mobile-order" to="/order" v-if="$config.orderLength > 0" @click.native="$formModal.displayModal(false)">Заявка <span>{{ $config.orderLength }}</span></router-link>
                            </div>

                            <div class="menu-mobile-nav-item" v-for="(link,index) in $sidebar.sidebarLinks">
                                <router-link v-if="link.id === 'waste' && $config.waste" class="menu-mobile-nav-link" :to="$config.waste[0].link.original">{{ link.name }}</router-link>

                                <router-link v-else class="menu-mobile-nav-link" :to="link.path">{{ link.name }}</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END Contacts col -->

            <!-- Form col -->
            <div class="menu-col menu-col-right">
                <div class="menu-form-container">
                    <div class="menu-form-title">
                        <div class="sub-title">Обратная связь</div>
                        <a class="menu-form-call" href="#cashmyvisit" v-if="$mq !== 'desktop'"></a>
                    </div>

                    <div class="menu-form-block">
                        <form class="form menu-form" ref="form">
                            <div class="menu-form-top">
                                <v-input name="feedback-name"
                                        id="feedback-name"
                                        v-validate="'required'"
                                        data-vv-value-path="innerValue"
                                        :field-error="errors"
                                        :has-error="errors.has('feedback-name')"
                                        v-model="request.name"
                                        label="Ваше имя"
                                        type="text"></v-input>

                                <v-input name="feedback-email"
                                        id="feedback-email"
                                        v-validate="'required|email'"
                                        data-vv-value-path="innerValue"
                                        :field-error="errors"
                                        :has-error="errors.has('feedback-email')"
                                        v-model="request.email"
                                        label="Ваша почта"
                                        type="text"></v-input>
                            </div>

                            <div class="menu-form-bottom">
                                <v-textarea name="feedback-message"
                                            id="feedback-message"
                                            label="Сообщение"
                                            v-validate="'required'"
                                            data-vv-value-path="innerValue"
                                            :field-error="errors"
                                            :has-error="errors.has('feedback-message')"
                                            v-model="request.message"></v-textarea>

                                <div class="menu-form-confirm">
                                    <v-checkbox name="feedback-confirm" id="feedback-confirm" :required="true" ref="confirm" v-model="request.confirm">Я согласен на <a href="/Grainatt_personal_data.pdf" target="_blank">обработку персональных данных</a></v-checkbox>
                                </div>

                                <div class="menu-form-send">
                                    <v-button text="Отправить" :disable="!formValid" ref="submit" v-on:click.native="validate(true)" :progress="true" :startProgress="formSubmited"></v-button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- END Form col -->
        </div>

        <!-- Menu footer -->
        <div class="menu-footer-block">
            <mobile-footer></mobile-footer>
        </div>
        <!-- END Menu footer -->
    </div>
    </transition>

    <!-- Feedback message -->
    <transition name="menu-message">
        <div class="menu-message" v-if="showMessage">
            <div class="menu-message-wr">
                <div class="menu-message-title pse-head" v-html="responseMessage.title"></div>
                <div class="menu-message-info" v-html="responseMessage.info"></div>
                <div class="menu-message-link">
                    <v-button link='/' text="На главную" type="link" @click.native="closeMenu"></v-button>
                </div>
            </div>
        </div>
    </transition>
    <!-- END Feedback message -->
</div>
</transition>
</template>

<script>
export default {
    data() {
        return {
            request: {
                name: '',
                email: '',
                message: '',
                confirm: true
            },
            responseMessage: {
                title: '',
                info: ''
            },
            formErrors: [],
            formValid: false,
            formSubmited: false,
            showMessage: false
        }
    },
    watch: {
        request: {
            handler: function(val, oldVal) {
                this.validate(false);
            },
            deep: true
        }
    },
    methods: {
        validate(showErrors) {
            let $this = this

            if (showErrors) {
                this.$validator.validateAll().then((result) => {
                    if (result && !$this.formErrors.length) {
                        this.formValid = true
                        this.submitForm()
                        return;
                    } else {
                        this.formValid = false
                    }
                });
            } else {
                this.checkForm();
            }
        },
        checkForm() {
            let $this = this
            this.formErrors = []

            // Check name
            if (!this.request.name) {
                this.formErrors.push('name')
            }

            // Check email
            if (!this.request.email) {
                this.formErrors.push('email')
            } else {
                this.$validator.validate('feedback-email').then(result => {
                    if (!result) {
                        this.formErrors.push('email')
                    }
                })
            }

            // Check message
            if (!this.request.message) {
                this.formErrors.push('feedback-message')
            }

            // Check confirm
            if (!this.request.confirm) {
                this.formErrors.push('confirm')
            }

            setTimeout(() => {
                $this.formValid = $this.formErrors.length ? false : true;
            }, 100)
        },
        submitForm() {
            if (this.formSubmited) return
            this.formSubmited = true;

            let data = new FormData(this.$refs.form),
                $this = this;

            this.formDataToJSON(data);

            axios.post('/api/send/feedback', data)
                .then(response => {
                    if (response.data.status === 'ok') {
                        $this.responseMessage.title = 'Ваше обращение принято!'
                        $this.responseMessage.info = 'В ближайшее время с вами свяжутся наши менеджеры'
                    } else {
                        $this.responseMessage.title = 'Произошла ошибка'
                        $this.responseMessage.info = 'Попробуйте повторить попытку позже'
                    }

                    this.$contentWindow.setView('menu-full')
                    $this.showMessage = true
                    $this.formSubmited = false
                    $this.resetForm()
                })
                .catch(e => {
                    console.log('error', e);
                    $this.responseMessage.title = 'Произошла ошибка'
                    $this.responseMessage.info = 'Попробуйте повторить попытку позже'
                    this.$contentWindow.setView('menu-full')
                    $this.showMessage = true
                    $this.formSubmited = false
                    $this.resetForm()
                })
        },
        formDataToJSON(data) {
            let result = {};

            for (var entry of data.entries())
            {
                result[entry[0]] = entry[1];
            }

            console.log(result);
        },
        afterCloseMenu() {
            this.responseMessage.title = ''
            this.responseMessage.info = ''
            this.showMessage = false
            this.formSubmited = false
        },
        closeMenu() {
            this.$contentWindow.setView(this.$contentWindow.beforeMenuOpenType)
            this.$contentWindow.viewType = this.$contentWindow.beforeMenuOpenType
            this.$contentWindow.beforeMenuOpenType = ''
            this.$menu.showMenu = false
            this.afterCloseMenu()
        },
        resetForm() {
            this.request = {
                name: '',
                email: '',
                message: '',
                confirm: true
            }
        }
    }
}
</script>
