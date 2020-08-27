<template>
    <footer class="footer-section">
        <v-container>
            <v-row>
                <v-col cols="3" class="footer-information">
                    <router-link to="/" class="router-link">BookStore.co</router-link>
                    <span>{{ $store.state.description }}</span>
                </v-col>
                <v-col cols="3">
                    <h3>Tentang Kami</h3>
                    <ul>
                        <li><router-link to="/">Tentang Kami</router-link></li>
                        <li><router-link to="/">Blog</router-link></li>
                        <li><router-link to="/">Karir</router-link></li>
                    </ul>
                </v-col>
                <v-col cols="3">
                    <h3>Bantuan</h3>
                    <ul>
                        <li><router-link to="/">Kebijakan Privasi</router-link></li>
                        <li><router-link to="/">Syarat dan Ketentuan</router-link></li>
                    </ul>
                </v-col>
                <v-col cols="3">
                    <h3>Hubungi Kami</h3>
                    <ul>
                        <li>mail@bookstore.co</li>
                        <li>0856 9546 9574</li>
                        <li>Tangerang, Indonesia</li>
                    </ul>
                </v-col>
            </v-row>
        </v-container>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style lang="scss">
@import "../assets/scss/styles.scss";

.footer-section {
    border-top: 1px solid #E1E1E1;
    padding: 50px 0;

    .footer-information {
        .router-link {
            font-size: 24px;
            color: $primary;
            font-weight: bold;
            text-decoration: none;
        }
        span {
            display: block;
            margin-top: 20px;
            font-size: 14px;
            color: $text-footer;
            font-weight: light;
        }
    }

    h3 {
        margin-bottom: 20px;
    }

    ul {
        padding-left: 0px !important;
        li {
            list-style: none;
            margin-bottom: 8px;
            color: $text-footer;
            font-size: 14px;
            a {
                text-decoration: none;
                color: $text-footer;
                font-size: 14px;

                &:hover {
                    color: $secondary;
                }
            }
        }
    }
}
</style>