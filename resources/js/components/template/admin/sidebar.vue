
<template>
    <div id="sidebar" class='active'>
        <div class="sidebar-wrapper active">
            <div class="sidebar-header">
                <img src="/images/logo.svg" alt="" srcset="">
            </div>
            <div class="sidebar-menu">
                <ul class="menu">
                    <li class='sidebar-title'>Main Menu</li>
                    <a href=""  custom>
                        <li class="sidebar-item" >
                        <a href="" class='sidebar-link'>
                            <i data-feather="user" width="20"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    </a>
                    <li class='sidebar-title'>Master</li>
                    <a href="/"  custom>
                        <li class="sidebar-item" >
                        <a href="" class='sidebar-link'>
                            <i data-feather="user" width="20"></i>
                            <span>Siswa</span>
                        </a>
                    </li>
                    </a>
                    <a href="/"  custom>
                        <li class="sidebar-item" >
                        <a href="" class='sidebar-link'>
                            <i data-feather="home" width="20"></i>
                            <span>Kelas</span>
                        </a>
                    </li>
                    </a>
                </ul>
            </div>
            <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
}
</script>
